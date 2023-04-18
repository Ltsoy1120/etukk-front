import Details from "app/components/UI/Details/Details"
import Previews from "app/layouts/Previews/Previews"
import SubjectLog from "app/layouts/SubjectLog/SubjectLog"
import LotPreview from "areas/lot/LotPreview/LotPreview"
import SellerPreview, { SellerPreviewProps } from "areas/seller/SellerPreview/SellerPreview"
import { IMAGE_MOCKS, LOT_PREVIEW_MOCK } from "constants/mocks"
import { useState } from "react"
import { Link } from "react-router-dom"

interface DetailedSellersProps {
  sellers: SellerPreviewProps[]
}

function DetailedSellers(props: DetailedSellersProps) {
  const [expandedSeller, setExpandedSeller] = useState<SellerPreviewProps | null>(null)
  function onSellerClick(seller: SellerPreviewProps) {
    setExpandedSeller(seller)
  }
  return (
    <>
      {expandedSeller === null && (
        <Previews asd>
          {props.sellers.map(seller => (
            <button type="button" onClick={() => onSellerClick(seller)} key={seller.id}>
              <SellerPreview {...seller} />
            </button>
          ))}
        </Previews>
      )}
      {expandedSeller !== null && (
        <SubjectLog subject={
          <SellerPreview {...expandedSeller} />
        } onBackward={() => setExpandedSeller(null)}>
          <Details date={new Date} summary={
            <>Продавец разместил новый лот в категории <Link to="/catalog">Мебель</Link></>
          }>
            <LotPreview {...LOT_PREVIEW_MOCK} />
          </Details>
        </SubjectLog>
      )}
    </>
  )
}

export default DetailedSellers