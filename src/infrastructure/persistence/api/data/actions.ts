/**
 *
 * This is auto-generated file.
 * All edits will not be preserved for the next generation.
 *
 * GitHub: https://github.com/FrameMuse/swagger-export-rfl
 *
 */

import {Action} from "../client.types"
import {
  SchemaLot,
  SchemaLotDeliveryOptions,
  SchemaLotReviewPhotos,
  SchemaUser,
} from "./schemas"

/**
 * of the given arguments and keywords.
 */
export const headDocs = (): Action => ({
  method: "HEAD",
  endpoint: `/docs`,
})

/**
 * of the given arguments and keywords.
 */
export const getDocs = (): Action => ({
  method: "GET",
  endpoint: `/docs`,
})

/**
 * of the given arguments and keywords.
 */
export const headDocsRedoc = (): Action => ({
  method: "HEAD",
  endpoint: `/docs/redoc`,
})

/**
 * of the given arguments and keywords.
 */
export const getDocsRedoc = (): Action => ({
  method: "GET",
  endpoint: `/docs/redoc`,
})

/**
 * of the given arguments and keywords.
 */
export const headDocsSwagger = (): Action => ({
  method: "HEAD",
  endpoint: `/docs/swagger`,
})

/**
 * of the given arguments and keywords.
 */
export const getDocsSwagger = (): Action => ({
  method: "GET",
  endpoint: `/docs/swagger`,
})

/**
 * OK
 */
export const postAuthUser = (body: {
  email: string
  password: string
}): Action<{
  access_token: string
  refresh_token: string
}> => ({
  method: "POST",
  endpoint: `/auth/user`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const postRegistrationUser = (body: {
  password: string
  fullname: string
  phonenumber?: string
  email?: string
  inn?: string
  organization?: boolean
}): Action<{access_token: string}> => ({
  method: "POST",
  endpoint: `/registration/user`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const postAuthTokenRefresh = (body: {
  refresh_token: string
}): Action<{
  access_token: string
  refresh_token: string
}> => ({
  method: "POST",
  endpoint: `/auth/token/refresh`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getUsers = (): Action<{
  id: number
  password: string
  salt: string
  fullname: string
  phonenumber: string
  email?: string | null
  city?: string | null
  address?: string | null
  inn?: string | null
  organization?: boolean
  created_at: string
  last_login?: string | null
  last_active: string
  last_logout?: string | null
  seller_rating?: number
  verified?: boolean
  banned?: boolean
  user_pic_id?: number | null
}> => ({
  method: "GET",
  endpoint: `/users`,
})

/**
 * OK
 */
export const patchUser = (
  body: Partial<{
    password: string
    fullname: string
    phonenumber: string
    email: string
    city: string
    address: string
    user_pic: string
    bet_confirmation: boolean
  }>
): Action<{
  id: number
  password: string
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
  user_pic_id?: number | null
}> => ({
  method: "PATCH",
  endpoint: `/user`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getUser = (): Action<{
  id: number
  password: string
  salt: string
  fullname: string
  phonenumber: string
  email: string
  city?: string | null
  address?: string | null
  inn?: string | null
  organization?: boolean
  created_at: string
  last_login?: string | null
  last_active: string
  last_logout?: string | null
  seller_rating?: number
  verified?: boolean
  banned?: boolean
  user_pic?: {filename: string}
  user_pic_id?: number | null
}> => ({
  method: "GET",
  endpoint: `/user`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const postUserFavoriteLot = (body: {
  lot_id: number
}): Action<{
  id: number
  created_at: string
  lot_id: number
  user_id: number
}> => ({
  method: "POST",
  endpoint: `/user/favorite/lot`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getUserFavoriteLot = (
  filters?: object
): Action<
  {
    id: number
    created_at: string
    lot_id: number
    user_id: number
    lot: SchemaLot
  }[]
> => ({
  method: "GET",
  endpoint: `/user/favorite/lot`,
  params: {...filters},
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const postUserFavoriteUser = (body: {
  fav_user_id: number
}): Action<{
  id: number
  created_at: string
  fav_user_id: number
  user_id: number
}> => ({
  method: "POST",
  endpoint: `/user/favorite/user`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getUserFavoriteUser = (
  filters?: object
): Action<
  {
    id: number
    created_at: string
    fav_user_id: number
    user_id: number
    fav_user: SchemaUser
  }[]
> => ({
  method: "GET",
  endpoint: `/user/favorite/user`,
  params: {...filters},
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getUserNotifications = (
  filters?: object
): Action<
  {
    id: number
    user_id: number
    text: string
    lot: SchemaLot
    lot_id: number
    event_time: string
  }[]
> => ({
  method: "GET",
  endpoint: `/user/notifications`,
  params: {...filters},
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getUserNotificationsSubscriptions = (): Action<
  {
    id: number
    user_id: number
    text: string
    user: SchemaUser
    event_time: string
  }[]
> => ({
  method: "GET",
  endpoint: `/user/notifications/subscriptions`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getUserNotificationsSubscriptionsBySubscriptionsId = (
  subscriptions_id: number
): Action<
  {
    id: number
    user_id: number
    text: string
    user: SchemaUser
    event_time: string
  }[]
> => ({
  method: "GET",
  endpoint: `/user/notifications/subscriptions/${subscriptions_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const postUserReview = (body: {
  to_lot_id: number
  to_user_id: number
  text?: string
  score: number
  user_review_photos?: string[]
}): Action<{
  id: number
  text?: string | null
  score: number
  created_at: string
  banned?: boolean
  to_user_id: number
  user_id: number
}> => ({
  method: "POST",
  endpoint: `/user/review`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getUserReview = <Filters extends object>(
  filters?: Filters
): Action<
  {
    id: number
    text?: string | null
    score: number
    created_at: string
    banned?: boolean
    to_user_id: number
    user: SchemaUser
    user_id: number
    lot: SchemaLot
  }[]
> => ({
  method: "GET",
  endpoint: `/user/review`,
  params: {...filters},
  config: {
    requireAuth: true,
  },
})

export const getUserCards = (): Action<
  {
    id: number
    pan: string
    user_id: number
    exp_date: string
    status: string
    created_at: string
    default: boolean
  }[]
> => ({
  method: "GET",
  endpoint: `/user/cards`,
  config: {
    requireAuth: true,
  },
})

export const patchUserCard = (
  card_id: number,
  body: {default: boolean}
): Action<{
  id: number
  pan: string
  user_id: number
  exp_date: string
  status: string
  created_at: string
  default: boolean
}> => ({
  method: "PATCH",
  endpoint: `/user/cards/${card_id}`,
  body,
  config: {
    requireAuth: true,
  },
})

export const deleteUserCard = (
  card_id: number
): Action<{
  id: number
  pan: string
  user_id: number
  exp_date: string
  status: string
  created_at: string
  default: boolean
}> => ({
  method: "DELETE",
  endpoint: `/user/cards/${card_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const postLotDraft = (body: {
  name: string
  description: string
  start_price: number
  categories: number[] | number
  city: string
  delivery_options: SchemaLotDeliveryOptions
  bidding_start_time: string
  bidding_end_time: string
  video_url: string
  lotphotos: string[]
  lotspecifications?: {
    id?: number
    name: string
    units?: string
    value: string
  }[]
  shipment_address: string

  height?: number
  length?: number
  width?: number
  weight?: number
}): Action<{
  id: number
  name?: string | null
  description?: string | null
  start_price?: number | null
  city?: string | null
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
  views?: number
  favorites?: number
  created_at: string
  edited_at: string
  buyer_id?: number | null
  user_id: number
}> => ({
  method: "POST",
  endpoint: `/lot/draft`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getLotDraft = (): Action<{
  id: number
  name?: string | null
  description?: string | null
  start_price?: number | null
  city?: string | null
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
  views?: number
  favorites?: number
  created_at: string
  edited_at: string
  buyer_id?: number | null
  user_id: number
}> => ({
  method: "GET",
  endpoint: `/lot/draft`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getLot = <Filters extends object>(
  limit?: number,
  offset?: number,
  filters?: Filters
): Action<
  {
    id: number
    name?: string | null
    description?: string | null
    start_price?: number | null
    city?: string | null
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
    views?: number
    favorites?: number
    created_at: string
    edited_at: string
    buyer_id?: number | null
    user_id: number
  }[]
> => ({
  method: "GET",
  endpoint: `/lot`,
  params: {limit, offset, ...filters},
})

/**
 * OK
 */
export const getLotByUser = <Filters extends object>(
  limit?: number,
  offset?: number,
  filters?: Filters
): Action<
  {
    id: number
    name?: string | null
    description?: string | null
    start_price?: number | null
    city?: string | null
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
    views?: number
    favorites?: number
    created_at: string
    edited_at: string
    buyer_id?: number | null
    user_id: number
  }[]
> => ({
  method: "GET",
  endpoint: `/lot/draft`,
  params: {limit, offset, ...filters},
})

/**
 * OK
 */
export const postLotReview = (body: {
  to_lot_id: number
  text?: string
  score: number
  video_url?: string
  lot_review_photos?: string[]
}): Action<{
  id: number
  text?: string | null
  score: number
  video_url?: string
  lotreviewphotos?: SchemaLotReviewPhotos[]
  created_at: string
  banned?: boolean
  to_lot_id: number
  to_user_id: number
  user_id: number
}> => ({
  method: "POST",
  endpoint: `/lot/review`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const postLotClaim = (body: {
  to_lot_id: number
  text?: string
  reason: string
  video_url?: string
  lot_claim_photos: string[]
}): Action => ({
  method: "POST",
  endpoint: `/lot/claim`,
  body,
  config: {
    requireAuth: true,
  },
})

export const postLotClaimReasons = (): Action<
  {id: number; name: string}[]
> => ({
  method: "GET",
  endpoint: `/lot/claim/reason`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getLotReview = <Filters = unknown>(
  filters?: Filters
): Action<
  {
    id: number
    text?: string | null
    score: number
    created_at: string
    to_lot: SchemaLot
    banned?: boolean
    video_url?: string
    lotreviewphotos?: SchemaLotReviewPhotos[]
    to_lot_id: number
    user: SchemaUser
    user_id: number
    to_user_id: number
  }[]
> => ({
  method: "GET",
  endpoint: `/lot/review`,
  params: {...filters},
})

/**
 * OK
 */
export const getCategory = (): Action<
  {
    id: number
    name: string
    parent_category_id?: number | null
  }[]
> => ({
  method: "GET",
  endpoint: `/category`,
})

/**
 * else - return false
 */
export const getRegistrationEmailConfirmByToken = (token: string): Action => ({
  method: "GET",
  endpoint: `/registration/email/confirm/${token}`,
  params: {token},
})

/**
 * OK
 */
export const postLotDraftByLotIdModerate = (
  lot_id: number
): Action<{
  id: number
  name?: string | null
  description?: string | null
  start_price?: number | null
  city?: string | null
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
  views?: number
  favorites?: number
  created_at: string
  edited_at: string
  buyer_id?: number | null
  user_id: number
}> => ({
  method: "POST",
  endpoint: `/lot/draft/${lot_id}/moderate`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const patchLotByLotIdUnpublish = (
  lot_id: number
): Action<{
  id: number
  name?: string | null
  description?: string | null
  start_price?: number | null
  city?: string | null
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
  views?: number
  favorites?: number
  created_at: string
  edited_at: string
  buyer_id?: number | null
  user_id: number
}> => ({
  method: "PATCH",
  endpoint: `/lot/${lot_id}/unpublish`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const deleteLotByLotIdNotifications = (
  lot_id: number
): Action<{
  id: number
  name?: string | null
  description?: string | null
  start_price?: number | null
  city?: string | null
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
  views?: number
  favorites?: number
  created_at: string
  edited_at: string
  buyer_id?: number | null
  user_id: number
}> => ({
  method: "DELETE",
  endpoint: `/lot/${lot_id}/notifications`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const patchLotDraftByLotIdArchive = (
  lot_id: number
): Action<{
  id: number
  name?: string | null
  description?: string | null
  start_price?: number | null
  city?: string | null
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
  views?: number
  favorites?: number
  created_at: string
  edited_at: string
  buyer_id?: number | null
  user_id: number
}> => ({
  method: "PATCH",
  endpoint: `/lot/draft/${lot_id}/archive`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const postLotByLotIdBet = (
  lot_id: number,
  multiply?: number
): Action<{
  id: number
  amount: number
  created_at: string
  lot_id: number
  user_id: number
  lot: SchemaLot
}> => ({
  method: "POST",
  endpoint: `/lot/${lot_id}/bet`,
  params: {multiply},
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getLotByLotIdBet = (
  lot_id: number
): Action<{
  id: number
  amount: number
  created_at: string
  lot_id: number
  user_id: number
}> => ({
  method: "GET",
  endpoint: `/lot/${lot_id}/bet`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const postLotByLotIdPayout = (
  lot_id: number,
  body: {card_id: number}
): Action<{
  payout: boolean
}> => ({
  method: "POST",
  endpoint: `/lot/${lot_id}/payout`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const deleteAdminLotByLotIdModerate = (lot_id: number): Action => ({
  method: "DELETE",
  endpoint: `/admin/lot/${lot_id}/moderate`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const postAdminLotByLotIdModerate = (
  lot_id: number
): Action<{
  id: number
  name?: string | null
  description?: string | null
  start_price?: number | null
  city?: string | null
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
  views?: number
  favorites?: number
  created_at: string
  edited_at: string
  buyer_id?: number | null
  user_id: number
}> => ({
  method: "POST",
  endpoint: `/admin/lot/${lot_id}/moderate`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const deleteAdminLotByLotIdBan = (lot_id: number): Action => ({
  method: "DELETE",
  endpoint: `/admin/lot/${lot_id}/ban`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const postAdminLotByLotIdBan = (
  lot_id: number
): Action<{
  id: number
  name?: string | null
  description?: string | null
  start_price?: number | null
  city?: string | null
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
  views?: number
  favorites?: number
  created_at: string
  edited_at: string
  buyer_id?: number | null
  user_id: number
}> => ({
  method: "POST",
  endpoint: `/admin/lot/${lot_id}/ban`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const deleteAdminUserByUserIdBan = (user_id: number): Action => ({
  method: "DELETE",
  endpoint: `/admin/user/${user_id}/ban`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const postAdminUserByUserIdBan = (
  user_id: number
): Action<{
  id: number
  password: string
  salt: string
  fullname: string
  phonenumber: string
  email?: string | null
  city?: string | null
  address?: string | null
  inn?: string | null
  organization?: boolean
  created_at: string
  last_login?: string | null
  last_active: string
  last_logout?: string | null
  seller_rating?: number
  verified?: boolean
  banned?: boolean
  user_pic_id?: number | null
}> => ({
  method: "POST",
  endpoint: `/admin/user/${user_id}/ban`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const deleteAdminUserReviewByUserReviewIdBan = (
  user_review_id: number
): Action => ({
  method: "DELETE",
  endpoint: `/admin/user_review/${user_review_id}/ban`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const postAdminUserReviewByUserReviewIdBan = (
  user_review_id: number
): Action<{
  id: number
  password: string
  salt: string
  fullname: string
  phonenumber: string
  email?: string | null
  city?: string | null
  address?: string | null
  inn?: string | null
  organization?: boolean
  created_at: string
  last_login?: string | null
  last_active: string
  last_logout?: string | null
  seller_rating?: number
  verified?: boolean
  banned?: boolean
  user_pic_id?: number | null
}> => ({
  method: "POST",
  endpoint: `/admin/user_review/${user_review_id}/ban`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const deleteAdminLotReviewByUserReviewIdBan = (
  user_review_id: number
): Action => ({
  method: "DELETE",
  endpoint: `/admin/lot_review/${user_review_id}/ban`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const postAdminLotReviewByUserReviewIdBan = (
  user_review_id: number
): Action<{
  id: number
  password: string
  salt: string
  fullname: string
  phonenumber: string
  email?: string | null
  city?: string | null
  address?: string | null
  inn?: string | null
  organization?: boolean
  created_at: string
  last_login?: string | null
  last_active: string
  last_logout?: string | null
  seller_rating?: number
  verified?: boolean
  banned?: boolean
  user_pic_id?: number | null
}> => ({
  method: "POST",
  endpoint: `/admin/lot_review/${user_review_id}/ban`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getUsersByUsersId = (
  users_id?: number
): Action<{
  id: number
  password: string
  salt: string
  fullname: string
  phonenumber: string
  email?: string | null
  city?: string | null
  address?: string | null
  inn?: string | null
  organization?: boolean
  created_at: string
  last_login?: string | null
  in_user_favorites?: boolean
  last_active: string
  last_logout?: string | null
  seller_rating?: number
  verified?: boolean
  banned?: boolean
  user_pic_id?: number | null
}> => ({
  method: "GET",
  endpoint: `/users/${users_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const patchUserByUserId = (
  user_id: number,
  body: {
    password: string
    firstname: string
    surname: string
    lastname: string
    phonenumber: string
    email: string
    city: string
    address: string
    user_pic: string
    bet_confirmation?: boolean
  }
): Action<{
  id: number
  password: string
  salt: string
  fullname: string
  phonenumber: string
  email?: string | null
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
  user_pic_id?: number | null
}> => ({
  method: "PATCH",
  endpoint: `/user/${user_id}`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getUserByUserId = (
  user_id?: number
): Action<{
  id: number
  password: string
  salt: string
  fullname: string
  phonenumber: string
  email?: string | null
  city?: string | null
  address?: string | null
  inn?: string | null
  organization?: boolean
  created_at: string
  last_login?: string | null
  in_user_favorites?: boolean
  last_active: string
  last_logout?: string | null
  seller_rating?: number
  verified?: boolean
  banned?: boolean
  user_pic?: {filename: string}
  user_pic_id?: number | null
}> => ({
  method: "GET",
  endpoint: `/user/${user_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const deleteUserByUserIdPictureByPictureId = (
  picture_id: number,
  user_id: number
): Action => ({
  method: "DELETE",
  endpoint: `/user/${user_id}/picture/${picture_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const deleteUserFavoriteLotByLotsId = (lots_id?: number): Action => ({
  method: "DELETE",
  endpoint: `/user/favorite/lot/${lots_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getUserFavoriteLotsByLotsId = (
  lots_id?: number
): Action<{
  id: number
  created_at: string
  lot_id: number
  user_id: number
}> => ({
  method: "GET",
  endpoint: `/user/favorite/lots/${lots_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const deleteUserFavoriteUserByUserId = (user_id?: number): Action => ({
  method: "DELETE",
  endpoint: `/user/favorite/user/${user_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getUserFavoriteUserByUserId = (
  user_id?: number
): Action<{
  id: number
  created_at: string
  fav_user_id: number
  user_id: number
}> => ({
  method: "GET",
  endpoint: `/user/favorite/user/${user_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getUserNotificationsByNotificationsId = (
  notifications_id?: number
): Action<{
  id: number
  user_id: number
  text: string
  lot_id: number
  event_time: string
}> => ({
  method: "GET",
  endpoint: `/user/notifications/${notifications_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const deleteUserReviewByReviewId = (review_id?: number): Action => ({
  method: "DELETE",
  endpoint: `/user/review/${review_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const patchUserReviewByReviewId = (
  review_id: number,
  body: {
    text: string
    score: number
  }
): Action<{
  id: number
  text?: string | null
  score: number
  created_at: string
  banned?: boolean
  to_user_id: number
  user_id: number
}> => ({
  method: "PATCH",
  endpoint: `/user/review/${review_id}`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getUserReviewByReviewId = (
  review_id?: number
): Action<{
  id: number
  text?: string | null
  score: number
  created_at: string
  banned?: boolean
  to_user_id: number
  user: SchemaUser
  user_id: number
}> => ({
  method: "GET",
  endpoint: `/user/review/${review_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const deleteLotDraftByDraftId = (draft_id?: number): Action => ({
  method: "DELETE",
  endpoint: `/lot/draft/${draft_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const patchLotDraftByDraftId = (
  draft_id: number,
  body: Partial<{
    name: string
    description: string
    start_price: number
    categories: number[] | number
    city: string
    delivery_options: SchemaLotDeliveryOptions
    bidding_start_time: string
    bidding_end_time: string
    video_url: string
    photos: string[]
  }>
): Action<{
  id: number
  name?: string | null
  description?: string | null
  start_price?: number | null
  city?: string | null
  shipment_address?: string | null
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
  views?: number
  favorites?: number
  created_at: string
  edited_at: string
  buyer_id?: number | null
  user_id: number
}> => ({
  method: "PATCH",
  endpoint: `/lot/draft/${draft_id}`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const patchLotById = (
  lot_id: number,
  body: Partial<{
    name: string
    description: string
    start_price: number
    categories: number[] | number
    city: string
    delivery_options: SchemaLotDeliveryOptions
    bidding_start_time: string
    bidding_end_time: string
    video_url: string
    photos: string[]
  }>
): Action<{
  id: number
  name?: string | null
  description?: string | null
  start_price?: number | null
  city?: string | null
  shipment_address?: string | null
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
  views?: number
  favorites?: number
  created_at: string
  edited_at: string
  buyer_id?: number | null
  user_id: number
}> => ({
  method: "PATCH",
  endpoint: `/lot/${lot_id}`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getLotDraftByDraftId = (
  draft_id?: number
): Action<{
  id: number
  name?: string | null
  description?: string | null
  start_price?: number | null
  city?: string | null
  shipment_address?: string | null
  delivery_options?: string | null
  video_url?: string | null
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
  archived?: boolean
  banned?: boolean
  bidding_start_time?: string | null
  bidding_end_time?: string | null
  reject_reason?: string | null
  now_price?: number | null
  status: string
  trade_status?: string | null
  views?: number
  favorites?: number
  created_at: string
  edited_at: string
  buyer_id?: number | null
  user_id: number
}> => ({
  method: "GET",
  endpoint: `/lot/draft/${draft_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const deleteLotByLotIdPhotoByPhotoId = (
  photo_id: number,
  lot_id: number
): Action => ({
  method: "DELETE",
  endpoint: `/lot/${lot_id}/photo/${photo_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getLotByLotId = <Filters extends object>(
  lot_id?: number
): Action<{
  id: number
  name?: string | null
  description?: string | null
  start_price?: number | null
  city?: string | null
  shipment_address?: string | null
  delivery_options?: string | null
  video_url?: string | null
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
  archived?: boolean
  banned?: boolean
  bidding_start_time?: string | null
  bidding_end_time?: string | null
  reject_reason?: string | null
  now_price?: number | null
  status?: string
  trade_status?: string | null
  views?: number
  favorites?: number
  created_at: string
  edited_at: string
  buyer_id?: number | null
  user_id: number
}> => ({
  method: "GET",
  endpoint: `/lot/${lot_id}`,
})

/**
 * OK
 */
export const postLotDraftByLotIdSpecification = (
  lot_id: number,
  body: {
    name: string
    units?: string
    value: string
    lot_id: number
  }
): Action<{
  id: number
  name: string
  units?: string | null
  value: string
  lot_id: number
}> => ({
  method: "POST",
  endpoint: `/lot/draft/${lot_id}/specification`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getLotDraftByLotIdSpecification = (
  lot_id: number
): Action<{
  id: number
  name: string
  units?: string | null
  value: string
  lot_id: number
}> => ({
  method: "GET",
  endpoint: `/lot/draft/${lot_id}/specification`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const deleteLotDraftByLotIdSpecificationBySpecificationId = (
  specification_id: number,
  lot_id: number
): Action => ({
  method: "DELETE",
  endpoint: `/lot/draft/${lot_id}/specification/${specification_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const patchLotDraftByLotIdSpecificationBySpecificationId = (
  specification_id: number,
  lot_id: number,
  body: {
    name: string
    units: string
    value: string
  }
): Action<{
  id: number
  name: string
  units?: string | null
  value: string
  lot_id: number
}> => ({
  method: "PATCH",
  endpoint: `/lot/draft/${lot_id}/specification/${specification_id}`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getLotDraftByLotIdSpecificationBySpecificationId = (
  specification_id: number,
  lot_id: number
): Action<{
  id: number
  name: string
  units?: string | null
  value: string
  lot_id: number
}> => ({
  method: "GET",
  endpoint: `/lot/draft/${lot_id}/specification/${specification_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const deleteLotReviewByReviewId = (review_id?: number): Action => ({
  method: "DELETE",
  endpoint: `/lot/review/${review_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const patchLotReviewByReviewId = (
  review_id: number,
  body: {
    text: string
    score: number
  }
): Action<{
  id: number
  text?: string | null
  score: number
  created_at: string
  banned?: boolean
  to_lot_id: number
  user_id: number
}> => ({
  method: "PATCH",
  endpoint: `/lot/review/${review_id}`,
  body,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getLotReviewByReviewId = (
  review_id?: number
): Action<{
  id: number
  text?: string | null
  score: number
  created_at: string
  banned?: boolean
  to_lot_id: number
  user_id: number
}> => ({
  method: "GET",
  endpoint: `/lot/review/${review_id}`,
  config: {
    requireAuth: true,
  },
})

/**
 * OK
 */
export const getCategoryByCategoryId = (
  category_id?: number
): Action<{
  id: number
  name: string
  parent_category_id?: number | null
}> => ({
  method: "GET",
  endpoint: `/category/${category_id}`,
  config: {
    requireAuth: true,
  },
})

export const getUserBets = (): Action<{
  outbid: SchemaLot[]
  outbid_len: number
  winning: SchemaLot[]
  winning_len: number
}> => ({
  method: "GET",
  endpoint: "/user/bets",
  config: {
    requireAuth: true,
  },
})

export const getUrlTinkoff = (): Action<{
  redirect_url: string
}> => ({
  method: "GET",
  endpoint: "/user/add_card",
  config: {
    requireAuth: true,
  },
})

export const postPasswordReset = (email: string): Action => ({
  method: "POST",
  endpoint: "/password/reset",
  body: {email},
  config: {
    requireAuth: true,
  },
})

export const postPasswordResetByToken = (
  token: string,
  body: {new_password: string}
): Action => ({
  method: "POST",
  endpoint: `/password/reset/${token}`,
  body,
  config: {
    requireAuth: true,
  },
})

export const getAddressPrompt = (
  address: string
): Action<{addresses: string[]}> => ({
  method: "GET",
  endpoint: `/address/prompt`,
  params: {address},
  config: {
    requireAuth: true,
  },
})

export const postLotByLotBuyerApprove = (
  lot_id: number,
  body: {
    delivery_address: string
    contact_phone: string
    shipment_dates: string[]
    shipment_times: string[]
  }
): Action<{
  buyer_contact_phone: string
  delivery_address: string
  price: number
  possible_shipment_dates: string
  possible_shipment_times: string
}> => ({
  method: "POST",
  endpoint: `/lot/${lot_id}/buyer_approve`,
  body,
  config: {
    requireAuth: true,
  },
})

export const postLotByLotCalcDelivery = (
  lot_id: number,
  body: {
    delivery_address: string
  }
): Action<{
  delivery_address: string
  delivery_price: number
  service_commission: number
  eta: number
}> => ({
  method: "POST",
  endpoint: `/lot/${lot_id}/calc_delivery`,
  body,
  config: {
    requireAuth: true,
  },
})

export const postLotByLotSellerApprove = (
  lot_id: number,
  body: {
    contact_phone: string
    shipment_datetime_start: string
    shipment_datetime_end: string
    comment: string
  }
): Action<{
  shipment_date: string
}> => ({
  method: "POST",
  endpoint: `/lot/${lot_id}/seller_approve`,
  body,
  config: {
    requireAuth: true,
  },
})

export const postLotByLotConfirmDelivery = (
  lot_id: number
): Action<{
  shipment_date: string
}> => ({
  method: "POST",
  endpoint: `/lot/${lot_id}/confirm_delivery`,
  config: {
    requireAuth: true,
  },
})

export const postLotByLotPay = (
  lot_id: number
): Action<{
  redirect_url: string
}> => ({
  method: "POST",
  endpoint: `/lot/${lot_id}/pay`,
  config: {
    requireAuth: true,
  },
})

export const getLotByLotCommission = (
  lot_id: number
): Action<{
  service_commission: number
}> => ({
  method: "GET",
  endpoint: `/lot/${lot_id}/commission`,
  config: {
    requireAuth: true,
  },
})

export const getDeliveryTimers = (): Action<
  {
    id: number
    type: "fill_delivery" | "confirm_shipment" | "confirm_delivery"
    value: number
  }[]
> => ({
  method: "GET",
  endpoint: `/delivery/timer`,
  config: {
    requireAuth: true,
  },
})

export const getTimes = (): Action<
  {
    begin: string
    end: string
  }[]
> => ({
  method: "GET",
  endpoint: `/lot/bidding_times`,
  config: {
    requireAuth: true,
  },
})

export const getSearch = (search_text: string): Action<SchemaLot[]> => ({
  method: "GET",
  endpoint: `/lot/search`,
  params: {search_text},
  config: {
    requireAuth: true,
  },
})
