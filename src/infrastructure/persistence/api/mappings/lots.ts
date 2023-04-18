import {
  LotDelivery,
  LotInfoType,
  LotPreviewType,
  LotStatus,
  LotTradeStatus,
} from "areas/lot/types"
import {PaginationType} from "interfaces/Nodejs"
import {DateInterval} from "utils/date"
import {Price} from "utils/extensions"

import {SchemaLot} from "../data/schemas"
import {mapImageUrl} from "./helpers"
import {mapUser} from "./user"

/**
 *
 * @deprecated
 */
export function mapLotPreview(lot: SchemaLot): LotPreviewType {
  return mapLot(lot)
  // return {
  //   id: lot?.id ?? -1,
  //   bookmarked: lot?.in_user_favorites ?? false,
  //   image: mapImageUrl(lot?.lotphotos?.[0]?.filename),
  //   city: lot?.city ?? "unknown",
  //   title: lot?.name ?? "unknown",
  //   startPrice: new Price(lot?.start_price ?? -1),
  //   currentPrice: new Price(lot?.now_price ?? -1),
  //   tradeStartTime: new Date(lot?.bidding_start_time ?? 0),
  //   tradeEndTime: new Date(lot?.bidding_end_time ?? 0),
  //   status: (lot?.status as LotStatus) ?? LotStatus.UNKNOWN,
  //   tradeStatus: (lot?.trade_status as LotTradeStatus) ?? LotTradeStatus.UNKNOWN,
  //   betsCount: lot?.bets_count ?? -1,
  //   editedAt: new Date(lot?.edited_at ?? -1),
  //   seller: mapUser(lot?.user)
  // }
}

export function mapLotsLists(
  lots: SchemaLot[]
): PaginationType<LotPreviewType> {
  return {
    current: 1,
    limit: 100,
    items: lots.map(mapLotPreview),
  }
}

export function mapLot(lot: SchemaLot): LotInfoType {
  // console.log("mapLot", lot)
  return {
    id: lot.id,
    delivery: lot.delivery_options as LotDelivery,
    title: lot.name || "unknown",
    rating: -1, //! default
    reviews: {dislikes: -1, likes: -1}, //! default
    type: "organization", //! default

    bookmarked: lot.in_user_favorites ?? false,
    archived: lot.archived ?? false,
    description: lot.description ?? "unknown",
    video: lot.video_url ?? "",
    slides: lot.lotphotos?.map(l => mapImageUrl(l.filename)) ?? [],
    slidesWithId:
      lot.lotphotos?.map(l => ({
        id: l.id,
        lot_id: l.lot_id,
        filename: mapImageUrl(l.filename),
      })) ?? [],
    specifications:
      lot.lotspecifications?.map(spec => ({
        id: spec.id,
        key: spec.name,
        value: spec.value,
      })) ?? [],

    city: lot.city ?? "unknown",
    shipment_address: lot.shipment_address ?? "unknown",
    startEndInterval: new DateInterval(
      lot.bidding_start_time,
      lot.bidding_end_time
    ),
    notifications: lot.notifications ?? true,
    betStep: new Price(lot.bet_step ?? -1),
    startPrice: new Price(lot.start_price ?? -1),
    currentPrice: new Price(lot.now_price ?? -1),
    user_id: lot.user_id,
    seller: mapUser(lot.user as any),
    buyer: mapUser(lot.buyer as any),

    status: (lot?.status as LotStatus) ?? LotStatus.UNKNOWN,
    tradeStatus:
      (lot?.trade_status as LotTradeStatus) ?? LotTradeStatus.UNKNOWN,

    editedAt: new Date(lot?.edited_at ?? -1),

    image: mapImageUrl(lot?.lotphotos?.[0]?.filename),
    tradeStartTime: new Date(lot?.bidding_start_time ?? 0),
    tradeEndTime: new Date(lot?.bidding_end_time ?? 0),
    betsCount: lot?.bets_count ?? -1,

    buyerId: lot.buyer_id ?? -1,

    deliveryOrder: {
      buyerContactPhone: lot.deliveryorder?.buyer_contact_phone ?? "unknown",
      delivery_address: lot.deliveryorder?.delivery_address ?? "unknown",
      deliveryDate: new Date(lot.deliveryorder?.delivery_date || -1),
      eta: lot.deliveryorder?.eta ?? -1,
      id: lot.deliveryorder?.id ?? -1,
      lotId: lot.deliveryorder?.lot_id ?? -1,
      possibleShipmentDates:
        lot.deliveryorder?.possible_shipment_dates ?? "unknown",
      possibleShipmentTimes:
        lot.deliveryorder?.possible_shipment_times ?? "unknown",
      price: lot.deliveryorder?.price ?? -1,
      sellerContactPhone: lot.deliveryorder?.seller_contact_phone ?? "unknown",
      shipmentAddress: lot.deliveryorder?.shipment_address ?? "unknown",
      shipmentDate: new Date(lot.deliveryorder?.shipment_date || -1),
      status: lot.deliveryorder?.status ?? "unknown",
    },
  }
}

// export function map

export function mapFiltersCategory(asd: any) {
  const filtersCategory = recurseCollapsedTree(asd)
  // return recurseCollapsedTree(asd)

  return filtersCategory
}

export interface CollapsedTreeElement {
  id: number
  name: string

  parent_category_id?: number | null
}

export interface RecursiveTreeElement {
  id: number
  name: string

  parent_category_id?: number | null
  children: RecursiveTreeElement[]
}

export function recurseCollapsedTree(
  collapsedTree: CollapsedTreeElement[]
): RecursiveTreeElement[] {
  function recurse(tree: CollapsedTreeElement[]): RecursiveTreeElement[] {
    return tree.map(treeElement => {
      const asd = collapsedTree.filter(
        collapsedTreeElement =>
          collapsedTreeElement?.parent_category_id === treeElement.id
      )
      return {
        ...treeElement,
        children: recurse(asd),
      }
    })
  }
  return recurse(collapsedTree.filter(c => c.parent_category_id == null))
  // return collapsedTree.map(treeElement => (
  //   {
  //     id: treeElement.id,
  //     name: treeElement.name,
  //     parent_category_id: treeElement.parent_category_id,
  //     children: recurseCollapsedTree(collapsedTree, startLevel + 1).filter(testTreeElement => testTreeElement.parent_category_id === treeElement.id)
  //   }
  // ))
}
