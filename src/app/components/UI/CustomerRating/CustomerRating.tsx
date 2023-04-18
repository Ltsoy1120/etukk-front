import "./CustomerRating.scss"

import CounterIcon from "../CounterIcon/CounterIcon"

interface CustomerRatingProps {
  sellerRating: number
  buyerRating: number
}

function CustomerRating(props: CustomerRatingProps) {
  return (
    <div className="customer-rating">
      <div className="customer-rating__entry">
        <span className="customer-rating__text">Рейтинг продавца</span>
        <div className="customer-rating__counters">
          <CounterIcon icon="star" count={props.sellerRating} />
        </div>
      </div>
      <div className="customer-rating__entry">
        <span className="customer-rating__text">Рейтинг покупателя</span>
        <div className="customer-rating__counters">
          <CounterIcon icon="star" count={props.sellerRating} />
        </div>
      </div>
      <div className="customer-rating__entry">
        <span className="customer-rating__text">Отзывы</span>
        <div className="customer-rating__counters">
          <CounterIcon icon="like" count={0} />
          <CounterIcon icon="dislike" count={0} />
        </div>
      </div>
    </div>
  )
}

export default CustomerRating
