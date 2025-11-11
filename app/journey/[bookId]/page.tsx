import { JourneyHeader } from '@/components/journey/JourneyHeader'
import { JourneyMap } from '@/components/journey/JourneyMap'
import { JourneyTimeline } from '@/components/journey/JourneyTimeline'
import { JourneyBadges } from '@/components/journey/JourneyBadges'

interface JourneyPageProps {
  params: {
    bookId: string
  }
}

export default function JourneyPage({ params }: JourneyPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* 상단 요약 카드 */}
      <JourneyHeader bookId={params.bookId} />

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 여정 지도 */}
          <div className="lg:col-span-2">
            <JourneyMap bookId={params.bookId} />
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            <JourneyBadges bookId={params.bookId} />
          </div>
        </div>

        {/* 타임라인 */}
        <div className="mt-12">
          <JourneyTimeline bookId={params.bookId} />
        </div>
      </div>
    </div>
  )
}
