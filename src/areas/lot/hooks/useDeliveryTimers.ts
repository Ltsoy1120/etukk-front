import {getDeliveryTimers} from "infrastructure/persistence/api/data/actions"
import {useQuery} from "react-fetching-library"

function useDeliveryTimers() {
  const response = useQuery(getDeliveryTimers())
  const fillDeliveryTimer =
    response.payload?.find(p => p.type === "fill_delivery")?.value ?? 15 // время на оплату
  const confirmDeliveryTimer =
    response.payload?.find(p => p.type === "confirm_delivery")?.value ?? 60 // подтверждение продавцом (перед вызовом курьера)
  const confirmShipmentTimer =
    response.payload?.find(p => p.type === "confirm_shipment")?.value ?? 60 // подтверждение доставки (после получения покупателем)

  return {
    fillDeliveryTimer,
    confirmDeliveryTimer,
    confirmShipmentTimer,
  }
}

export default useDeliveryTimers
