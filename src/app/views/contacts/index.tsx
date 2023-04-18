import "./Contacts.scss"

import Entries from "app/layouts/Entries/Entries"
import Entry from "app/layouts/Entries/Entry"
import { Helmet } from "react-helmet"

function ContactsView() {
  return (
    <div className="contacts">
      <Helmet>
        <title>Контакты | etukk.ru</title>
      </Helmet>
      <h2 className="heading">Контакты</h2>
      <h3 className="heading">{`ООО "АМО ГРУПП"`}</h3>
      <Entries>
        <Entry>
          <span>Юридический адрес</span>
          <span>308023, Белгородская область, г Белгород, Студенческая ул, д. 18, офис 102</span>
        </Entry>
        <Entry>
          <span>ОГРН</span>
          <span>1213100012058 от 10 сентября 2021 г.</span>
        </Entry>
        <Entry>
          <span>ИНН</span>
          <span>3123482286</span>
        </Entry>
        <Entry>
          <span>КПП</span>
          <span>312301001</span>
        </Entry>
        <Entry>
          <span>Телефон</span>
          <span>+7 (495) 324 -09-59 </span>
        </Entry>
        <Entry>
          <span>E-mail</span>
          <span>info@etukk.ru</span>
        </Entry>
      </Entries>
    </div>
  )
}

export default ContactsView