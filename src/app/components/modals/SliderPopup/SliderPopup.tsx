import "./SliderPopup.scss"

import Slider from "app/components/containers/Slider/Slider"
import Icon from "app/components/UI/Icon/Icon"
import {useModalContext} from "react-modal-global"
import {stopPropagation} from "utils/common"

interface SliderPopupProps {
  slides: string[]
  initSlideIndex?: number
}

function SliderPopup(props: SliderPopupProps) {
  const {close} = useModalContext()
  return (
    <div className="slider-popup" onClick={stopPropagation(close)}>
      <div className="slider-popup__container">
        <button className="slider-popup__close" type="button" onClick={close}>
          <Icon name="cross" />
        </button>
        <Slider {...props} />
      </div>
    </div>
  )
}

export default SliderPopup
