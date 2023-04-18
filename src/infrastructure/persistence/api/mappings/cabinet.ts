import { LotPreviewType } from "areas/lot/types"
import { PaginationType } from "interfaces/Nodejs"

import { mapLotPreview } from "./lots"
import { mapUserType } from "./user"

export function mapCabinet(payload: any) {
  return {
    ...payload.result,
    type: mapUserType(payload.result.type)
  }
}

export function mapCabinetNotifications({ result }: any) {
  return result.map((item: any) => ({
    ...item,
    createdDate: new Date(item.date_create)
  }))
}

export function mapCabinetUsersSettings({ result }: any): Record<"bidUpConfirm" | "smsOnSubscriptionsChange" | "smsOnBidChange", boolean> {
  return {
    bidUpConfirm: result.increase,
    smsOnSubscriptionsChange: result.subscriptions,
    smsOnBidChange: result.bidding
  }
}

/**
 * 
 * @deprecated should be rewritten
 */
export function mapLotDisputesLists({ result }: any): { items: LotPreviewType[] } {
  return {
    // ...result,
    items: result.map(mapLotPreview)
  }
}

