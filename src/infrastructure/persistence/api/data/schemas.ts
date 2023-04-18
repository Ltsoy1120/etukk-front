/**
 *
 * This is auto-generated file.
 * All edits will not be preserved for the next generation.
 *
 * GitHub: https://github.com/FrameMuse/swagger-export-rfl
 *
 */

export interface SchemaUser {
  id: number
  salt: string
  fullname: string
  phonenumber: string
  email: string
  city?: string | null
  address?: string | null
  inn?: string | null
  organization?: boolean
  bet_confirmation?: boolean
  created_at: string
  last_login?: string | null
  last_active: string
  last_logout?: string | null
  seller_rating?: number
  verified?: boolean
  banned?: boolean
  user_pic?: {
    id?: number
    filename: string
  }
  user_pic_id?: number | null
}

export interface SchemaUserFavoriteLots {
  id: number
  created_at: string
  lot_id: number
  user_id: number
}

export interface SchemaUserFavoriteUsers {
  id: number
  created_at: string
  fav_user_id: number
  user_id: number
}

export interface SchemaUserNotifications {
  id: number
  user_id: number
  text: string
  lot: SchemaLot
  lot_id: number
  event_time: string
}

export interface SchemaUserReview {
  id: number
  text?: string | null
  score: number
  created_at: string
  banned?: boolean
  to_user_id: number
  user_id: number
}

export interface SchemaLot {
  id: number
  name?: string | null
  description?: string | null
  start_price?: number | null
  city?: string | null
  shipment_address?: string | null
  bet_step?: number | null
  delivery_options?: string | null
  video_url?: string | null
  archived?: boolean
  banned?: boolean
  bidding_start_time?: string | null
  bidding_end_time?: string | null
  reject_reason?: string | null
  now_price?: number | null
  status?: string
  trade_status?: string | null
  notifications?: boolean
  views?: number
  favorites?: number
  created_at: string
  edited_at: string
  buyer_id?: number | null
  user_id: number
  bets_count?: number
  in_user_favorites?: boolean
  user?: SchemaUser
  buyer?: SchemaUser
  lotphotos?: {
    id: number
    lot_id: number
    filename: string
  }[]
  lotspecifications?: {
    id?: number
    name: string
    units?: string
    value: string
  }[]

  deliveryorder?: {
    approved_by_buyer?: null
    approved_by_seller?: null
    buyer_comment?: null
    buyer_contact_phone?: "8 491 412 2247"
    confirmed_at?: null
    delivery_address?: "ст. Красногорск (Моск.), пер. Советской Армии, д. 30 к. 6, 692480"
    delivery_coordinates?: null
    delivery_date?: "2022-07-04T03:54:39+00:00"
    eta?: 331
    id?: 204
    lot_id?: 1088
    possible_shipment_dates?: "2022-07-03"
    possible_shipment_times?: "22:23:39"
    price?: 822
    remote_id?: null
    seller_comment?: null
    seller_contact_phone?: "8 (024) 478-7726"
    shipment_address?: "д. Осташков, наб. Коминтерна, д. 4/1 к. 82, 605189"
    shipment_coordinates?: null
    shipment_date?: "2022-07-03T22:23:39+00:00"
    status?: "delivered_finish"
    user_id?: 28
    uuid?: "d9a0cc76-8b7e-47b1-8428-b7e74381162d"
    version?: 1
  }
}

export type SchemaLotDeliveryOptions = "in_city" | "intercity"

export interface SchemaLotReview {
  id: number
  text?: string | null
  score: number
  video_url?: string
  lotreviewphotos?: SchemaLotReviewPhotos[]
  created_at: string
  banned?: boolean
  to_lot_id: number
  user_id: number
}

export interface SchemaLotReviewPhotos {
  id: number
  filename: string
  lot_review_id: number
}

export interface SchemaCategory {
  id: number
  name: string
  parent_category_id?: number | null
}

export interface SchemaBet {
  id: number
  amount: number
  created_at: string
  lot_id: number
  user_id: number
}

export interface SchemaLotSpecification {
  id: number
  name: string
  units?: string | null
  value: string
  lot_id: number
}
