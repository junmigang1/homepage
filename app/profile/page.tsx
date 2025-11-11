'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'

interface UserProfile {
  id: string
  email: string
  name: string
  image: string
  provider: string
  createdAt: string
  updatedAt: string
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/journey')
      return
    }

    if (session?.user?.id) {
      fetchUserProfile(session.user.id)
    }
  }, [session, status, router])

  const fetchUserProfile = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`)
      if (response.ok) {
        const data = await response.json()
        setUserProfile(data)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">프로필</h1>

        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-6 mb-6">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-24 h-24 rounded-full border-4 border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-400">
                {session.user?.name?.[0] || 'U'}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold">
                {session.user?.name || '사용자'}
              </h2>
              <p className="text-gray-600">{session.user?.email}</p>
            </div>
          </div>

          {userProfile && (
            <div className="space-y-4 border-t pt-6">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  사용자 ID
                </label>
                <p className="mt-1 font-mono text-sm">{userProfile.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  로그인 제공자
                </label>
                <p className="mt-1 capitalize">{userProfile.provider}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  가입일
                </label>
                <p className="mt-1">
                  {new Date(userProfile.createdAt).toLocaleString('ko-KR')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  최종 업데이트
                </label>
                <p className="mt-1">
                  {new Date(userProfile.updatedAt).toLocaleString('ko-KR')}
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t">
            <button
              onClick={() => signOut({ callbackUrl: '/journey' })}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
