import "./Reviews.scss"

import { ReactNode } from "react"

interface ReviewsProps {
  children: ReactNode
}

function Reviews(props: ReviewsProps) {
  return (
    <div className="reviews">{props.children}</div>
  )
}

export default Reviews
