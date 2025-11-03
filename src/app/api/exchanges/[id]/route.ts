import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status } = body

    const exchange = await prisma.exchange.update({
      where: { id: params.id },
      data: { status },
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
      }
    })

    return NextResponse.json(exchange)
  } catch (error) {
    console.error('Error updating exchange:', error)
    return NextResponse.json({ error: 'Failed to update exchange' }, { status: 500 })
  }
}
