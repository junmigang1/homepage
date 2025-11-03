import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    const exchanges = await prisma.exchange.findMany({
      where: {
        OR: [
          { requesterId: userId },
          { ownerId: userId }
        ]
      },
      include: {
        book: {
          select: {
            title: true,
            author: true,
            coverUrl: true,
          }
        },
        requester: {
          select: {
            name: true,
            school: true,
            avatarUrl: true,
          }
        },
        owner: {
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
    })

    return NextResponse.json(exchanges)
  } catch (error) {
    console.error('Error fetching exchanges:', error)
    return NextResponse.json({ error: 'Failed to fetch exchanges' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bookId, requesterId, ownerId, method } = body

    const exchange = await prisma.exchange.create({
      data: {
        bookId,
        requesterId,
        ownerId,
        method,
        status: 'requested'
      }
    })

    return NextResponse.json(exchange)
  } catch (error) {
    console.error('Error creating exchange:', error)
    return NextResponse.json({ error: 'Failed to create exchange' }, { status: 500 })
  }
}
