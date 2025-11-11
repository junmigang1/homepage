'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'

interface Room {
  id: string
  hostId: string
  maxMembers: number
  currentMembers: number
  members: string[]
  status: 'open' | 'closed'
  createdAt: string
}

export default function JourneyListPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [roomId, setRoomId] = useState<string>('')
  const [room, setRoom] = useState<Room | null>(null)
  const [maxMembers, setMaxMembers] = useState<number>(4)
  const [userId, setUserId] = useState<string>(
    'user_' + Math.random().toString(36).substring(2, 9)
  )
  const [joinRoomId, setJoinRoomId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  // 세션이 있으면 userId 업데이트
  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id)
    }
  }, [session])

  // 자동 리다이렉트는 주석 처리 (방 생성 시스템 사용을 위해)
  // useEffect(() => {
  //   // 첫 번째 책의 여정 페이지로 리다이렉트
  //   if (mockBooks.length > 0) {
  //     router.push(`/journey/${mockBooks[0].id}`)
  //   }
  // }, [router])

  const createRoom = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/rooms/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hostId: userId,
          maxMembers: maxMembers,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create room')
      }

      setRoom(data)
      setRoomId(data.id)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '방 생성에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const joinRoom = async () => {
    if (!joinRoomId.trim()) {
      setError('방 ID를 입력해주세요.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/rooms/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId: joinRoomId,
          userId: userId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join room')
      }

      setRoom(data)
      setRoomId(data.id)
      setJoinRoomId('')
    } catch (err: any) {
      setError(err.message || '방 입장에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const checkRoomStatus = async () => {
    if (!roomId.trim()) {
      setError('방 ID를 입력해주세요.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const response = await fetch(`/api/rooms/${roomId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch room')
      }

      setRoom(data)
    } catch (err: any) {
      setError(err.message || '방 상태 조회에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">방 생성 시스템</h1>

        {/* 로그인 섹션 */}
        <div className="mb-6 p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
          {status === 'loading' ? (
            <p className="text-center text-gray-600">로딩 중...</p>
          ) : session ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold text-lg">
                    {session.user?.name || '사용자'}
                  </p>
                  <p className="text-sm text-gray-600">{session.user?.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    사용자 ID:{' '}
                    <span className="font-mono">
                      {session.user?.id || userId}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push('/profile')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  프로필 보기
                </button>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  로그아웃
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-gray-700">
                로그인하여 방을 생성하고 참여하세요
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => signIn('google')}
                  className="px-6 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google로 로그인
                </button>
                <button
                  onClick={() => signIn('kakao')}
                  className="px-6 py-3 bg-yellow-300 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-sm font-medium"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z" />
                  </svg>
                  Kakao로 로그인
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 사용자 ID 표시 (로그인 안 했을 때만) */}
        {!session && (
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">
              현재 사용자 ID:{' '}
              <span className="font-mono font-semibold">{userId}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              로그인하면 실제 사용자 ID로 변경됩니다.
            </p>
          </div>
        )}

        {/* 방 생성 섹션 */}
        <div className="mb-8 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">방 생성</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                최대 인원
              </label>
              <input
                type="number"
                min="2"
                max="10"
                value={maxMembers}
                onChange={e => setMaxMembers(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-md"
                disabled={loading}
              />
            </div>
            <button
              onClick={createRoom}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '생성 중...' : '방 생성'}
            </button>
          </div>
        </div>

        {/* 방 입장 섹션 */}
        <div className="mb-8 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">방 입장</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">방 ID</label>
              <input
                type="text"
                value={joinRoomId}
                onChange={e => setJoinRoomId(e.target.value)}
                placeholder="방 ID를 입력하세요"
                className="w-full px-4 py-2 border rounded-md"
                disabled={loading}
              />
            </div>
            <button
              onClick={joinRoom}
              disabled={loading}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '입장 중...' : '방 입장'}
            </button>
          </div>
        </div>

        {/* 방 상태 확인 섹션 */}
        {roomId && (
          <div className="mb-8 p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">방 상태 확인</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">방 ID</label>
                <input
                  type="text"
                  value={roomId}
                  onChange={e => setRoomId(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  disabled={loading}
                />
              </div>
              <button
                onClick={checkRoomStatus}
                disabled={loading}
                className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '조회 중...' : '상태 조회'}
              </button>
            </div>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* 방 정보 표시 */}
        {room && (
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">방 정보</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">방 ID:</span>{' '}
                <span className="font-mono">{room.id}</span>
              </p>
              <p>
                <span className="font-semibold">호스트 ID:</span>{' '}
                <span className="font-mono">{room.hostId}</span>
              </p>
              <p>
                <span className="font-semibold">최대 인원:</span>{' '}
                {room.maxMembers}명
              </p>
              <p>
                <span className="font-semibold">현재 인원:</span>{' '}
                {room.currentMembers}명
              </p>
              <p>
                <span className="font-semibold">상태:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded ${
                    room.status === 'open'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {room.status === 'open' ? '열림' : '닫힘'}
                </span>
              </p>
              <p>
                <span className="font-semibold">참여자:</span>{' '}
                {room.members.join(', ')}
              </p>
              <p>
                <span className="font-semibold">생성 시간:</span>{' '}
                {new Date(room.createdAt).toLocaleString('ko-KR')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
