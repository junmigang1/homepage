import { Hero } from '@/components/home/Hero'
import { LiveJourneyCarousel } from '@/components/home/LiveJourneyCarousel'
import { RecommendedGrid } from '@/components/home/RecommendedGrid'
import { ValueTiles } from '@/components/home/ValueTiles'
import { CommunityHighlights } from '@/components/home/CommunityHighlights'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* 실시간 여정 피드 */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">
            지금 이 순간, 책들이 떠돌고 있어요
          </h2>
          <LiveJourneyCarousel />
        </div>
      </section>

      {/* 추천 교환 도서 */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">
            이번 주 추천 도서
          </h2>
          <RecommendedGrid />
        </div>
      </section>

      {/* 가치 섹션 */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">
            책책만의 특별한 가치
          </h2>
          <ValueTiles />
        </div>
      </section>

      {/* 커뮤니티 하이라이트 */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">
            활발한 커뮤니티
          </h2>
          <CommunityHighlights />
        </div>
      </section>
    </div>
  )
}
