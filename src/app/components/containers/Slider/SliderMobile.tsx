import "./Slider.scss"
import "swiper/scss"
import "swiper/scss/navigation"
import "swiper/scss/pagination"

import {useState} from "react"
import SwiperCore, {Navigation, Thumbs} from "swiper"
import {Swiper, SwiperSlide} from "swiper/react"

SwiperCore.use([Navigation, Thumbs])

interface SwiperProps {
  video?: string
  slides: string[]
  initSlideIndex?: number
  allowFullscreen?: boolean
}

export default function SliderMobile(props: SwiperProps) {
  const [activeThumb, setActiveThumb] = useState<SwiperCore>()
  return (
    <div
      style={{
        paddingBottom: "2rem",
        paddingTop: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop
        modules={[Navigation, Thumbs]}
        grabCursor
        thumbs={{
          swiper: activeThumb && (!activeThumb.destroyed ? activeThumb : null),
        }}
        className="swiper-main">
        {props.slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide} alt="slide" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        loop
        modules={[Navigation, Thumbs]}
        onSwiper={setActiveThumb}
        className="swiper-thumbs">
        {props.slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-thumbs-wrapper">
              <img src={slide} alt="slide" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
