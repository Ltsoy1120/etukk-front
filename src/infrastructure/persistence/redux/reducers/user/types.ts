export type User = UserSigned | UserAnonymous

export interface UserSigned {
  auth: true
  id: number
  type: UserType
  fullName: string
  firstName: string
  lastName: string
  avatar: string
  city: string
  verified: boolean
  created_at: string
  email: string
  phone: string
  bet_confirmation?: boolean

  buyerRating: number
  sellerRating: number

  expires?: Date
}

export interface UserAnonymous {
  auth: false
  id?: number
  firstName?: string
}

export type UserType = "organization" | "user"
