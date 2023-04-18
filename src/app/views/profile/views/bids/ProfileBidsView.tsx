import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Switcher from "app/components/UI/Switcher/Switcher"
import LotPreviews from "areas/lot/LotPreview/LotPreviews"
import { getUserBets } from "infrastructure/persistence/api/data/actions"
import { mapLot } from "infrastructure/persistence/api/mappings/lots"
import { Route, Routes } from "react-router"
import { NavLink } from "react-router-dom"

function ProfileBidsView() {
  return (
    <QueryContainer action={getUserBets()}>
      {payload => (
        <>
          <Switcher>
            <NavLink to="" end>Побеждающие ставки ({payload.winning_len})</NavLink>
            <NavLink to="outbids">Перебитые ставки ({payload.outbid_len})</NavLink>
          </Switcher>
          <Routes>
            <Route path="" element={<LotPreviews lookalike previews={payload.winning.map(mapLot)} />} />
            <Route path="outbids" element={<LotPreviews lookalike previews={payload.outbid.map(mapLot)} />} />
          </Routes>
        </>
      )}
    </QueryContainer>
  )
}

export default ProfileBidsView
