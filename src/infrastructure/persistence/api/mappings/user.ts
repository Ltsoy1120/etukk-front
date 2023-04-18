import {UserSigned} from "infrastructure/persistence/redux/reducers/user/types"

import {SchemaUser} from "../data/schemas"
import {mapImageUrl} from "./helpers"

export function mapUser(user?: SchemaUser): UserSigned {
  // console.log("mapUser", user)
  const [firstName, lastName] = (
    user?.fullname ?? "unknown unknownovich"
  ).split(" ")

  return {
    auth: true,
    id: user?.id ?? -1,
    avatar: mapImageUrl(user?.user_pic?.filename),
    city: user?.city ?? "unknown",
    fullName: user?.fullname ?? "unknown",
    firstName: firstName,
    lastName: lastName,
    type: user?.organization ? "organization" : "user",
    created_at: user?.created_at ?? "unknown",
    verified: user?.verified ?? false,
    buyerRating: user?.seller_rating ?? -1,
    sellerRating: user?.seller_rating ?? -1,
    email: user?.email ?? "unknown",
    phone: user?.phonenumber ?? "unknown",
    bet_confirmation: user?.bet_confirmation,
  }
}

export function mapUserType(userType: "organization" | "user") {
  switch (userType) {
    case "user":
      return "Физическое Лицо"
    case "organization":
      return "Юридическое Лицо"

    default:
      return "Неизвестное"
  }
}
