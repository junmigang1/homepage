// app/api/books/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getRedisClient } from '@/lib/redis'
import { getCurrentUserId } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const genre = searchParams.get('genre')
    const condition = searchParams.get('condition')
    const search = searchParams.get('search')

    const redis = getRedisClient()
    const keys = await redis.keys('book:*')
    const books = await Promise.all(
      keys.map(async key => JSON.parse((await redis.get(key)) || '{}'))
    )

    let filteredBooks = [...books]

    if (genre && genre !== '전체') {
      filteredBooks = filteredBooks.filter(book => book.genre === genre)
    }

    if (condition && condition !== '전체') {
      filteredBooks = filteredBooks.filter(book => book.condition === condition)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredBooks = filteredBooks.filter(
        book =>
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower)
      )
    }

    return NextResponse.json(filteredBooks)
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // 세션에서 userId 가져오기
    const userId = await getCurrentUserId()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, author, coverUrl, condition, genre } = body

    const newBook = {
      id: String(Date.now()),
      title,
      author,
      coverUrl:
        coverUrl ||
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200',
      condition,
      genre,
      ownerId: userId,
      isExchangeable: true,
      reviews: [],
      createdAt: new Date(),
    }

    const redis = getRedisClient()
    await redis.set(`book:${newBook.id}`, JSON.stringify(newBook))

    return NextResponse.json(newBook)
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    )
  }
}
