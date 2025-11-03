import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const genre = searchParams.get('genre')
    const condition = searchParams.get('condition')
    const school = searchParams.get('school')
    const search = searchParams.get('search')

    const books = await prisma.book.findMany({
      where: {
        ...(genre && genre !== '전체' ? { genre } : {}),
        ...(condition && condition !== '전체' ? { condition } : {}),
        ...(search ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { author: { contains: search, mode: 'insensitive' } },
          ]
        } : {}),
        isExchangeable: true,
      },
      include: {
        owner: {
          select: {
            name: true,
            school: true,
          }
        },
        reviews: {
          select: {
            rating: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(books)
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, author, coverUrl, condition, genre, ownerId, exchangeMethod, message } = body

    const book = await prisma.book.create({
      data: {
        title,
        author,
        coverUrl,
        condition,
        genre,
        ownerId,
        isExchangeable: true,
      }
    })

    // 여정 노드 생성
    await prisma.journeyNode.create({
      data: {
        bookId: book.id,
        userId: ownerId,
        note: message,
        city: '서울', // 기본값
        lat: 37.5665,
        lng: 126.9780,
      }
    })

    return NextResponse.json(book)
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 })
  }
}
