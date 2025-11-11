import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import KakaoProvider from 'next-auth/providers/kakao'
import { getRedisClient } from '@/lib/redis'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email || !user.name) {
        return false
      }

      try {
        const redis = getRedisClient()

        // 기존 유저 확인 (이메일로 검색)
        const keys = await redis.keys('user:*')
        let existingUser = null
        let userId: string

        for (const key of keys) {
          const userData = JSON.parse((await redis.get(key)) || '{}')
          if (userData.email === user.email) {
            existingUser = userData
            userId = userData.id
            break
          }
        }

        if (!existingUser) {
          // 새 유저 생성
          userId = `user_${user.email.split('@')[0]}_${Date.now()}`
        }

        // Redis에 유저 정보 저장/업데이트
        const userData = {
          id: userId!,
          email: user.email,
          name: user.name,
          image: user.image || '',
          provider: account?.provider || 'unknown',
          providerId: account?.providerAccountId || '',
          createdAt: existingUser?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        await redis.set(`user:${userId}`, JSON.stringify(userData))

        // user 객체에 id 추가
        user.id = userId!
        return true
      } catch (error) {
        console.error('Error saving user to Redis:', error)
        return true // 로그인은 허용하되 Redis 저장 실패는 로그만 남김
      }
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/journey', // 로그인 페이지를 journey로 설정
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
