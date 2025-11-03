import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const journeyNodes = await prisma.journeyNode.findMany({
      where: { bookId: params.bookId },
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
    })

    const book = await prisma.book.findUnique({
      where: { id: params.bookId },
      select: {
        title: true,
        author: true,
        coverUrl: true,
        owner: {
          select: {
            name: true,
            school: true,
            avatarUrl: true,
          }
        }
      }
    })

    return NextResponse.json({
      book,
      journeyNodes,
      totalReaders: journeyNodes.length,
      totalDistance: calculateTotalDistance(journeyNodes)
    })
  } catch (error) {
    console.error('Error fetching journey:', error)
    return NextResponse.json({ error: 'Failed to fetch journey' }, { status: 500 })
  }
}

function calculateTotalDistance(nodes: any[]): number {
  // 간단한 거리 계산 (실제로는 더 정확한 계산 필요)
  return nodes.length * 50 // 임시값
}
