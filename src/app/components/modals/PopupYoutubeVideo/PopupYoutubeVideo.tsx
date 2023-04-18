import "./PopupYoutubeVideo.scss"

import Icon from "app/components/UI/Icon/Icon"
import { useModalContext } from "react-modal-global"
import { YouTubeVideo } from "utils/business"
import { stopPropagation } from "utils/common"

interface PopupYoutubeVideoProps {
  url: string
}

function PopupYoutubeVideo(props: PopupYoutubeVideoProps) {
  const modal = useModalContext()
  modal.params.weak = true

  const youTubeVideo = new YouTubeVideo(props.url)
  return (
    <div className="popup-youtube-video" onClick={stopPropagation(modal.close)}>
      <div className="popup-youtube-video__container">
        <button className="popup-youtube-video__close" type="button" onClick={modal.close}>
          <Icon name="cross" />
        </button>
        <iframe
          className="popup-youtube-video__iframe"
          src={youTubeVideo.embed}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default PopupYoutubeVideo
