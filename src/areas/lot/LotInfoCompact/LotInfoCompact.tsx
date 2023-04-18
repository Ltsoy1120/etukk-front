import "./LotInfoCompact.scss"

import Author, {AuthorProps} from "app/components/UI/Author/Author"
import {Price} from "utils/extensions"

interface LotInfoCompactProps {
  image: string
  title: string
  price?: Price
  seller?: AuthorProps
}

function LotInfoCompact(props: LotInfoCompactProps) {
  return (
    <div className="lot-info-compact">
      <img
        src={props.image}
        alt="lot preview"
        className="lot-info-compact__image"
      />
      <div className="lot-info-compact__title">{props.title}</div>
      {/* {props.seller && <Author {...props.seller} price={props.price}/>} */}
    </div>
  )
}

export default LotInfoCompact
