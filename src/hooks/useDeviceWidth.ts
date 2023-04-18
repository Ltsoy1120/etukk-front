import useResizeObserverSize, { DeviceWidths } from "./useResizeObserverEntry"

function useDeviceWidth(deviceWidth: DeviceWidths): [boolean, number] {
  const { inlineSize: bodyWidth } = useResizeObserverSize(document.body)
  return [bodyWidth <= deviceWidth, bodyWidth]
}

export default useDeviceWidth