import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import ButtonLink from "app/components/UI/Button/ButtonLink"
import SortingToggle from "app/components/UI/SortingToggle/SortingToggle"
import Switcher from "app/components/UI/Switcher/Switcher"
import Buttons from "app/layouts/Buttons/Buttons"
import Previews from "app/layouts/Previews/Previews"
import LotPreview from "areas/lot/LotPreview/LotPreview"
import {LotStatus} from "areas/lot/types"
import SellerPreview from "areas/seller/SellerPreview/SellerPreview"
import {
  getUserFavoriteLot,
  getUserFavoriteUser,
} from "infrastructure/persistence/api/data/actions"
import {mapLotPreview} from "infrastructure/persistence/api/mappings/lots"
import {mapUser} from "infrastructure/persistence/api/mappings/user"
import {useState} from "react"
import {Helmet} from "react-helmet"
import {Outlet, Route, Routes} from "react-router"
import {NavLink} from "react-router-dom"

function FavouritesView() {
  const [sortingLots, setSortingLots] = useState<"all" | "new" | null>(null)
  const [sortingOrganization, setSortingOrganization] = useState<
    "user" | "organization" | null
  >(null)

  const userFavouriteLotsAction = getUserFavoriteLot(
    sortingLots === "new" ? {order_by: "created_at"} : undefined
  )
  const userFavouriteUsersAction = getUserFavoriteUser(
    sortingOrganization
      ? {fav_user__organization: sortingOrganization === "organization"}
      : undefined
  )
  return (
    <>
      <Helmet>
        <title>Избранное | etukk.ru</title>
      </Helmet>
      <h2 className="heading">избранное</h2>
      <Buttons>
        <ButtonLink small outline nav to="lots">
          Лоты
        </ButtonLink>
        <ButtonLink small outline nav to="sellers">
          Продавцы
        </ButtonLink>
      </Buttons>
      <Routes>
        <Route
          path="lots/*"
          element={
            <QueryContainer action={userFavouriteLotsAction} key="lots">
              {all => {
                const wait = all.filter(
                  item => item.lot.status === LotStatus.MODERATION
                )
                const trading = all.filter(
                  item => item.lot.status === LotStatus.PUBLISHED
                )
                const sold = all.filter(
                  item => item.lot.status === LotStatus.SOLD
                )
                return (
                  <Routes>
                    <Route
                      element={
                        <>
                          <Switcher>
                            <NavLink to="" end>
                              Все ({all.length})
                            </NavLink>
                            <NavLink to="pending">
                              Ожидающие ({wait.length})
                            </NavLink>
                            <NavLink to="trading">
                              Торги ({trading.length})
                            </NavLink>
                            <NavLink to="sold">Проданы ({sold.length})</NavLink>
                          </Switcher>
                          <SortingToggle
                            onChange={value => setSortingLots(value as never)}>
                            <option value="all">Все лоты</option>
                            <option value="new">Cначала новые</option>
                          </SortingToggle>
                          <Outlet />
                        </>
                      }>
                      <Route
                        index
                        element={
                          <Previews>
                            {all.map(item => (
                              <LotPreview
                                {...mapLotPreview(item.lot)}
                                lookalike
                                bookmarked
                                key={item.id}
                              />
                            ))}
                          </Previews>
                        }
                      />
                      <Route
                        path="pending"
                        element={
                          <Previews>
                            {wait.map(item => (
                              <LotPreview
                                {...mapLotPreview(item.lot)}
                                lookalike
                                bookmarked
                                key={item.id}
                              />
                            ))}
                          </Previews>
                        }
                      />
                      <Route
                        path="trading"
                        element={
                          <Previews>
                            {trading.map(item => (
                              <LotPreview
                                {...mapLotPreview(item.lot)}
                                lookalike
                                bookmarked
                                key={item.id}
                              />
                            ))}
                          </Previews>
                        }
                      />
                      <Route
                        path="sold"
                        element={
                          <Previews>
                            {sold.map(item => (
                              <LotPreview
                                {...mapLotPreview(item.lot)}
                                lookalike
                                bookmarked
                                key={item.id}
                              />
                            ))}
                          </Previews>
                        }
                      />
                    </Route>
                  </Routes>
                )
              }}
            </QueryContainer>
          }
        />
        <Route
          path="sellers"
          element={
            <QueryContainer action={userFavouriteUsersAction} key="sellers">
              {payload => (
                <>
                  <SortingToggle<never> onChange={setSortingOrganization}>
                    <option value="user">Частные лица</option>
                    <option value="organization">Юридические лица</option>
                  </SortingToggle>
                  <Previews>
                    {payload.map(item => (
                      <SellerPreview
                        dislikes={0}
                        likes={0}
                        {...mapUser(item.fav_user)}
                        bookmarked
                        key={item.id}
                      />
                    ))}
                  </Previews>
                </>
              )}
            </QueryContainer>
          }
        />
      </Routes>
    </>
  )
}

export default FavouritesView
