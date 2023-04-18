import "./Slider.scss"

import PopupYoutubeVideo from "app/components/modals/PopupYoutubeVideo/PopupYoutubeVideo"
import SliderPopup from "app/components/modals/SliderPopup/SliderPopup"
import Icon from "app/components/UI/Icon/Icon"
import useDeviceWidth from "hooks/useDeviceWidth"
import {DeviceWidths} from "hooks/useResizeObserverEntry"
import {useState} from "react"
import {Modal} from "react-modal-global"
import {YouTubeVideo} from "utils/business"

import SliderMobile from "./SliderMobile"

interface SliderProps {
  video?: string
  slides: string[]
  initSlideIndex?: number
  allowFullscreen?: boolean
}

function Slider(props: SliderProps) {
  const [isMobile] = useDeviceWidth(DeviceWidths.Mobile)
  const [index, setIndex] = useState(props.initSlideIndex || 0)
  function updateIndex(value: number) {
    if (value < 0) {
      return setIndex(props.slides.length - 1)
    }
    if (value > props.slides.length - 1) {
      return setIndex(0)
    }
    setIndex(value)
  }
  const next = () => updateIndex(index + 1)
  const prev = () => updateIndex(index - 1)

  const currentSlide = props.slides[index]

  function openSliderPopup(initSlideIndex: number) {
    if (!props.allowFullscreen) return

    Modal.open(SliderPopup, {slides: props.slides, initSlideIndex})
  }

  return (
    <div className="slider">
      <div className="slider__container">
        <button
          className="slider__current"
          aria-hidden
          type="button"
          onClick={() => openSliderPopup(index)}>
          <div>
            {currentSlide.includes("youtu") && (
              <div
                className="slider-video"
                onClick={() =>
                  Modal.open(PopupYoutubeVideo, {url: currentSlide})
                }>
                <img
                  className="slider__slide"
                  src={new YouTubeVideo(currentSlide).thumbnail}
                  alt="youtube thumbnail"
                />
                <div className="slider-video__play">
                  <Icon className="slider-video__icon" name="play" />
                </div>
              </div>
            )}
            {!currentSlide.includes("you") && (
              <img className="slider__slide" src={currentSlide} alt="slide" />
            )}
          </div>
        </button>
        {props.slides.length > 1 && !isMobile && (
          <div className="slider__arrows">
            <button className="slider__arrow" type="button" onClick={prev}>
              <Icon name="chevron" />
            </button>
            <button className="slider__arrow" type="button" onClick={next}>
              <Icon name="chevron" />
            </button>
          </div>
        )}
        {props.slides.length > 1 && (
          <div className="slider__slides">
            {props.slides.map((slide, index) =>
              isMobile ? (
                <img className="slider__slide" src={slide} alt="slide" />
              ) : (
                <button
                  type="button"
                  onClick={() => (openSliderPopup(index), setIndex(index))}
                  key={index}>
                  {slide.includes("youtu") ? (
                    <div className="slider-video">
                      <img
                        className="slider__slide"
                        src={new YouTubeVideo(currentSlide).thumbnail}
                        alt="youtube thumbnail"
                      />
                      <div className="slider__slide-video__play">
                        <Icon
                          className="slider__slide-video__icon"
                          name="play"
                        />
                      </div>
                    </div>
                  ) : (
                    <img className="slider__slide" src={slide} alt="slide" />
                  )}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Slider
