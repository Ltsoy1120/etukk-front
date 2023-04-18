import {
  LotDelivery,
  LotPreviewType,
  LotStatus,
  LotTradeStatus,
} from "areas/lot/types"
import {UserSigned} from "infrastructure/persistence/redux/reducers/user/types"
import {DateInterval} from "utils/date"
import {Price} from "utils/extensions"

import mockPNG from "./mock.png"
import mock2JPG from "./mock-2.jpg"
import mock3JPG from "./mock-3.jpg"

export const IMAGE_MOCKS = [mockPNG, mock2JPG, mock3JPG]
export const USER_MOCK: UserSigned = {
  auth: true,
  id: -1,
  type: "user",
  fullName: "string",
  firstName: "string",
  lastName: "string",
  avatar: "string",
  city: "string",
  verified: true,
  created_at: "string",
  email: "string",
  phone: "string",

  buyerRating: -1,
  sellerRating: -1,
}
export const LOT_PREVIEW_MOCK: LotPreviewType = {
  id: 0,
  city: "Москва",
  title:
    "ЗАГОЛОВОК ВМЕСТИТСЯ 2 СТРОКИ НЕ БОЛЬШЕ ЗАГОЛОВОК ВМЕСТИТСЯ 2 СТРОКИ НЕ БОЛЬШЕ",
  image: IMAGE_MOCKS[1],
  startPrice: new Price(100),
  currentPrice: new Price(900),
  tradeStartTime: new Date(),
  tradeEndTime: new Date(),
  bookmarked: true,
  status: LotStatus.UNKNOWN,
  tradeStatus: LotTradeStatus.UNKNOWN,
  betsCount: 17,
  editedAt: new Date(),
  seller: USER_MOCK,
  slides: [],
  slidesWithId: [],
  description: "",
  specifications: [],
  startEndInterval: new DateInterval(),
  delivery: LotDelivery.all,
  type: "user",
  reviews: {
    likes: 0,
    dislikes: 0,
  },
  rating: 0,
  betStep: new Price(-1),
  user_id: USER_MOCK.id,
  buyer: USER_MOCK,
}
