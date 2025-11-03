import { ProfileHeader } from '@/components/me/ProfileHeader'
import { MyJourneyMap } from '@/components/me/MyJourneyMap'
import { ReadingStats } from '@/components/me/ReadingStats'
import { MyExchanges } from '@/components/me/MyExchanges'
import { BadgesPanel } from '@/components/me/BadgesPanel'
import { MyComments } from '@/components/me/MyComments'

export default function MePage() {
  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        {/* 프로필 헤더 */}
        <ProfileHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 나의 여정 지도 */}
            <MyJourneyMap />
            
            {/* 독서 통계 */}
            <ReadingStats />
            
            {/* 교환 기록 */}
            <MyExchanges />
            
            {/* 나의 코멘트 */}
            <MyComments />
          </div>
          
          {/* 사이드바 */}
          <div className="space-y-6">
            <BadgesPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
