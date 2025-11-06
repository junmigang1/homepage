import { NextRequest, NextResponse } from 'next/server'
import { mockExchanges } from '@/lib/mockData'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status } = body

    const exchange = mockExchanges.find(e => e.id === params.id)

    if (!exchange) {
      return NextResponse.json({ error: 'Exchange not found' }, { status: 404 })
    }

    exchange.status = status as any
    exchange.updatedAt = new Date()

    return NextResponse.json(exchange)
  } catch (error) {
    console.error('Error updating exchange:', error)
    return NextResponse.json({ error: 'Failed to update exchange' }, { status: 500 })
  }
}
