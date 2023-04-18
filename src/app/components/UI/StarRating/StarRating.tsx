import "./StarRating.scss"

import { Dispatch, ReactNode, useState } from "react"
import { classWithModifiers } from "utils/common"

import Icon from "../Icon/Icon"

const STAR_RATING_INIT = 0
const STAR_RATING_MIN = 1
const STAR_RATING_MAX = 5

interface StarRatingProps {
  size?: "small"
  readOnly?: boolean

  name?: string
  min?: number
  max?: number
  solid?: boolean
  children?: ReactNode
  onChange?: Dispatch<number>
}

function StarRating(props: StarRatingProps) {
  const [rating, setRating] = useState(props.min || STAR_RATING_INIT)
  const [pointerRating, setPointerRating] = useState(props.min || STAR_RATING_INIT)

  function normalizeStarRating(value: number) {
    if (props.solid) {
      return Math.round(value)
    }

    return value
  }

  function updatePointerRating(value: number) {
    value = normalizeStarRating(value)

    if (props.readOnly) return
    if (value < STAR_RATING_MIN) value = STAR_RATING_MIN

    setPointerRating(value)
  }
  function updateRating(value: number) {
    value = normalizeStarRating(value)

    if (props.readOnly) return

    setRating(value)
    props.onChange?.(value)
  }
  return (
    <div className={classWithModifiers("star-rating", props.size, props.readOnly && "readonly")} onPointerLeave={() => setPointerRating(rating)}>
      {props.children && (
        <div className="star-rating__label">{props.children}</div>
      )}
      <div className="star-rating__stars">
        {[...Array(props.max || STAR_RATING_MAX)].map((_, index) => {
          const beforeRating = index + 0.5
          const afterRating = index + 1
          return (
            <div className="star-rating__star" key={index}>
              <div className="star-rating__base">
                <Icon name="star-empty" />
              </div>
              <div
                className={classWithModifiers("star-rating__before", pointerRating >= beforeRating && "active")}
                onClick={() => updateRating(beforeRating)}
                onMouseEnter={() => updatePointerRating(beforeRating)}
              ><Icon name="star" /></div>
              <div
                className={classWithModifiers("star-rating__after", pointerRating >= afterRating && "active")}
                onClick={() => updateRating(afterRating)}
                onMouseEnter={() => updatePointerRating(afterRating)}
              ><Icon name="star" /></div>
            </div>
          )
        })}
      </div>
      <input type="hidden" name={props.name} value={rating} />
    </div>
  )
}

export default StarRating
