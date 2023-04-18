import Chat from "app/components/containers/Chat/Chat"
import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import ButtonLink from "app/components/UI/Button/ButtonLink"
import { FAQ, FAQClause } from "app/components/UI/FAQ/FAQ"
import Buttons from "app/layouts/Buttons/Buttons"
import { Helmet } from "react-helmet"
import { Route, Routes } from "react-router"

import moderPNG from "./moder.png"

function SupportView() {
  return (
    <>
      <Helmet>
        <title>Техподдержка | etukk.ru</title>
      </Helmet>
      <h2 className="heading">Техподдержка</h2>
      <Buttons>
        <ButtonLink small outline nav to="" end>FAQ</ButtonLink>
        <ButtonLink small outline nav to="chat">Чат</ButtonLink>
      </Buttons>
      <Routes>
        <Route index element={<SupportViewFAQ />} />
        <Route path="chat" element={<SupportViewChatContainer />} />
      </Routes>
    </>
  )
}

function SupportViewFAQ() {
  return (
    <FAQ>
      <FAQClause summary="Как разместить лот?">
        Не публикуйте несколько объявлений об одном и том же товаре и услуге — их заблокируют.
        <br />
        <br />
        Если у вас несколько предложений, создайте для каждого из них отдельное объявление — так покупателям будет проще найти нужный товар и вы быстрее заключите сделку.
        <br />
        <br />
        Подготовьте уникальные описания и фотографии для разных объявлений — даже если товары очень похожи. Иначе мы можем посчитать их одинаковыми и заблокировать одно из объявлений как повторное.
        <br />
        <br />
        Теперь составим объявление так, чтобы оно привлекало покупателей и не нарушало правила размещения.
        <ul>
          <li>Название</li>
          <li>Категория</li>
          <li>Вид</li>
          <li>Цена</li>
          <li>Фото</li>
          <li>Адрес</li>
        </ul>
        Оно должно точно передавать суть того, что вы предлагаете: например, «Наушники Samsung E-345», «Ремонт стиральных машин». Не указывайте в названии цену и контакты, не используйте слова, которые привлекают внимание («скидка», «акция» и т.п.)
        <br />
        <br />
        В некоторых категориях («Недвижимость», «Автомобили», «Экскаваторы», «Бульдозеры», «Погрузчики») название составляется автоматически: на основе указанных в объявлении характеристик.
      </FAQClause>
      <FAQClause summary="Почему мое объявление не проходит модерацию?">123</FAQClause>
      <FAQClause summary="Как вызвать курьера, чтобы отправить товар покупателю?">123</FAQClause>
    </FAQ>
  )
}
function SupportViewChatContainer() {
  return null
  // return (
  // <QueryContainer action={getCabinetChat(20, 0)}>
  //   {payload => (
  //     <Chat messages={[]} recipient={{ avatar: moderPNG, firstName: "Модератор" }} />
  //   )}
  // </QueryContainer>
  // )
}

export default SupportView