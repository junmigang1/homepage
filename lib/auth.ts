import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextRequest } from 'next/server'

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}

export async function getCurrentUserId(): Promise<string | null> {
  const user = await getCurrentUser()
  return user?.id || null
}

/**
 * API 라우트에서 요청의 세션에서 userId를 가져옵니다.
 * @param request NextRequest 객체
 * @returns userId 또는 null
 */
export async function getUserIdFromRequest(
  request: NextRequest
): Promise<string | null> {
  try {
    // 쿠키에서 세션 토큰 추출
    const sessionToken =
      request.cookies.get('next-auth.session-token')?.value ||
      request.cookies.get('__Secure-next-auth.session-token')?.value

    if (!sessionToken) {
      return null
    }

    // 세션에서 사용자 정보 가져오기
    const session = await getServerSession(authOptions)
    return session?.user?.id || null
  } catch (error) {
    console.error('Error getting userId from request:', error)
    return null
  }
}
