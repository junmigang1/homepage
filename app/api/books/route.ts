import { NextRequest, NextResponse } from 'next/server'
import { mockBooks } from '@/lib/mockData'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const genre = searchParams.get('genre')
    const condition = searchParams.get('condition')
    const search = searchParams.get('search')

    let filteredBooks = [...mockBooks]

    if (genre && genre !== '전체') {
      filteredBooks = filteredBooks.filter(book => book.genre === genre)
    }

    if (condition && condition !== '전체') {
      filteredBooks = filteredBooks.filter(book => book.condition === condition)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredBooks = filteredBooks.filter(book =>
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower)
      )
    }

    return NextResponse.json(filteredBooks)
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, author, coverUrl, condition, genre, ownerId } = body

    const newBook = {
      id: String(mockBooks.length + 1),
      title,
      author,
      coverUrl: coverUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200',
      condition,
      genre,
      ownerId,
      owner: mockBooks[0].owner, // 임시로 첫 번째 사용자 사용
      isExchangeable: true,
      reviews: [],
      createdAt: new Date(),
    }

    mockBooks.push(newBook)

    return NextResponse.json(newBook)
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 })
  }
}
