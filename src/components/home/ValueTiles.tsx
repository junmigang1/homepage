import { Card, CardContent } from '@/components/ui/card'
import { RefreshCw, Users, MapPin } from 'lucide-react'

const values = [
  {
    icon: RefreshCw,
    title: '순환 독서',
    description:
      '한 권의 책이 여러 독자에게 순환하며 새로운 가치를 창출합니다.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Users,
    title: '독자 연결',
    description:
      '책을 매개로 한 독자들이 만나고 소통하는 의미있는 공간을 제공합니다.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: MapPin,
    title: '여정 추적',
    description:
      '책의 여정을 지도로 추적하고 각 독자의 감상과 흔적을 기록합니다.',
    color: 'text-secondary-foreground',
    bgColor: 'bg-secondary/20',
  },
]

export function ValueTiles() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {values.map((value, index) => {
        const Icon = value.icon
        return (
          <Card
            key={index}
            className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-8">
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-full ${value.bgColor} flex items-center justify-center`}
              >
                <Icon className={`h-8 w-8 ${value.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
