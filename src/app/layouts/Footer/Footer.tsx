import "./Footer.scss"

import OuterLink from "app/components/UI/OuterLink"
import {Link} from "react-router-dom"

function Footer() {
  return (
    <footer className="footer">
      <Link to="/">
        <img src="/static/images/logo.svg" alt="etukk logo" />
      </Link>
      <div className="footer__group">
        <Link className="footer__link" to="/favourites/lots">
          Избранное
        </Link>
        <Link className="footer__link" to="/lots/draft">
          Разместить лот
        </Link>
        <small className="footer__copyright">Все права защищены, 2022©</small>
      </div>
      <div className="footer__group">
        <Link className="footer__link" to="/notifications/lots">
          Уведомления
        </Link>
        <Link className="footer__link" to="/profile">
          Профиль
        </Link>
        <Link
          className="footer__link footer__link--underline"
          to="/terms/policy">
          Политика конфиденциальности
        </Link>
      </div>
      <div className="footer__group">
        <Link className="footer__link" to="/support">
          Тех. поддержка
        </Link>
        <Link className="footer__link" to="/about">
          О нас
        </Link>
        <Link
          className="footer__link footer__link--underline"
          to="/terms/rules">
          Правила пользования сайтом
        </Link>
      </div>
      <div className="footer__group footer__group--s">
        <OuterLink
          className="footer__link"
          to="tel:+7 (495) 324 -09-59"
          noTarget>
          +7 (495) 324 -09-59
        </OuterLink>
        <OuterLink className="footer__link" to="mailto:info@etukk.ru" noTarget>
          info@etukk.ru
        </OuterLink>
      </div>
      <div className="footer__group-tablet">
        <Link className="footer__link--underline-mobile" to="/terms/policy">
          Политика конфиденциальности
        </Link>
        <Link className="footer__link--underline-mobile" to="/terms/rules">
          Правила пользования сайтом
        </Link>
        <small className="footer__copyright-mobile">
          Все права защищены, 2022©
        </small>
      </div>
    </footer>
  )
}

export default Footer
