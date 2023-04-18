import {DEFAULT_STAR_RATING_MAX} from "consts"

export const getRating = (
  likes: number,
  dislikes: number,
  max = DEFAULT_STAR_RATING_MAX
) => max - (dislikes / likes) * max

export class YouTubeVideo {
  readonly id: string
  readonly url: URL

  readonly embed: string
  readonly thumbnail: string

  constructor(url: string) {
    const videoUrl = new URL(url)
    // const videoId = (videoUrl.pathname + videoUrl.search).replace(
    //   /\/|\/embed\/|\/watch\?v=/,
    //   ""
    // )
    function youtube_parser(url: string) {
      const regExp =
        /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/
      const match = url.match(regExp)
      return match ? match[1] : ""
    }
    const videoId = youtube_parser(url)

    this.id = videoId
    this.url = videoUrl

    this.embed = `https://www.youtube.com/embed/${videoId}`
    this.thumbnail = `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`
  }
}
