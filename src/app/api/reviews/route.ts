import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookId = searchParams.get('bookId')
    const limit = searchParams.get('limit')

    const reviews = await prisma.review.findMany({
      where: bookId ? { bookId } : {},
      include: {
        user: {
          select: {
            name: true,
            school: true,
            avatarUrl: true,
          }
        },
        book: {
          select: {
            title: true,
            author: true,
            coverUrl: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      ...(limit ? { take: parseInt(limit) } : {})
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bookId, userId, content, rating } = body

    const review = await prisma.review.create({
      data: {
        bookId,
        userId,
        content,
        rating
      },
      include: {
        user: {
          select: {
            name: true,
            school: true,
            avatarUrl: true,
          }
        },
        book: {
          select: {
            title: true,
            author: true,
            coverUrl: true,
          }
        }
      }
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}
