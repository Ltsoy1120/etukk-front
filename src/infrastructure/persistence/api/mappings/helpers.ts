import asdPNG from "./asd.png"

export function mapImageUrl(item?: string | null) {
  if (item == null) {
    return asdPNG
  }
  return process.env.REACT_APP_API_HOST + "/media/" + item
}