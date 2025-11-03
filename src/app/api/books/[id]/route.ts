import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const book = await prisma.book.findUnique({
      where: { id: params.id },
      include: {
        owner: {
          select: {
            name: true,
            school: true,
            avatarUrl: true,
          }
        },
        journeyNodes: {
          include: {
            user: {
              select: {
                name: true,
                school: true,
                avatarUrl: true,
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        },
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                school: true,
                avatarUrl: true,
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }

    return NextResponse.json(book)
  } catch (error) {
    console.error('Error fetching book:', error)
    return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 })
  }
}
