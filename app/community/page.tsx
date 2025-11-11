import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CommunityFeed } from '@/components/community/CommunityFeed'
import { ChallengeSection } from '@/components/community/ChallengeSection'
import { PopularReviews } from '@/components/community/PopularReviews'

export default function CommunityPage() {
  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4">커뮤니티</h1>
          <p className="text-muted-foreground">
            독자들과 소통하고 책에 대한 이야기를 나눠보세요
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="challenges">챌린지</TabsTrigger>
            <TabsTrigger value="reviews">인기 리뷰</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CommunityFeed />
              </div>
              <div className="space-y-6">
                <PopularReviews />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="mt-6">
            <ChallengeSection />
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <PopularReviews />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
