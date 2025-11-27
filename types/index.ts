export interface User {
  id: string
  name: string
  email?: string
  image?: string
  avatar?: string // Alias for image, used in some components
  school?: string
}

export interface Book {
  id: string
  title: string
  author: string
  coverUrl: string
  genre?: string
  condition?: string
  ownerId?: string
  owner?: User // For UI display purposes when populated
  rating?: number
  reviewCount?: number
  isExchangeable: boolean
  createdAt?: string | Date

  // Journey specific fields
  currentLocation?: string
  readerCount?: number
  lastActivity?: string
  progress?: number
}

export interface Review {
  id: string
  userId: string
  user?: User
  bookId: string
  content: string
  rating?: number
  createdAt: string | Date
  reactions?: {
    heart: number
    thumbsUp: number
    message: number
  }
}
