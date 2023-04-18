import "./AboutView.scss"

import { Helmet } from "react-helmet"

function AboutView() {
  return (
    <div className="about-view">
      <Helmet>
        <title>О нас | etukk.ru</title>
      </Helmet>
      <h2 className="heading">О нас</h2>
      <div className="about-view-description">
        <div className="about-view-description__logo">
          <img src="/static/images/about/about_logo.svg" className="about-view-description__logo-img" />
          <div className="about-view-description__logo-text">
            <div className="about-view-description__logo-text--red">
              <img className="about-view-description__logo-text--marker" src="/static/images/about/marker.svg" />
              <p className="about-view-description__logo-text--this">это</p>
            </div>
            <p className="about-view-description__logo-text--description">онлайн-аукцион, на котором ваша вещь становится лотом, а заинтересованные покупатели становятся соперниками.</p>
          </div>
        </div>
      </div>
      <div className="about-view-pluses">
        <p className="about-view-pluses__more">а также ,</p>
        <div className="about-view-pluses__field">
          <img src="/static/images/about/about_main.png" className="about-view-pluses__field-main" />
          <div className="about-view-pluses__field-item about-view-pluses__guaranty">
            <img src="/static/images/about/red_check.svg" />
            <p className="about-view-pluses__field-item--text">Гарантия защищенности каждой сделки</p>
          </div>
          <div className="about-view-pluses__field-item about-view-pluses__admin">
            <img src="/static/images/about/red_check.svg" />
            <p className="about-view-pluses__field-item--text">Сопровождение всех сделок администрацией площадки</p>
          </div>
          <div className="about-view-pluses__field-item about-view-pluses__archive">
            <img src="/static/images/about/red_check.svg" />
            <p className="about-view-pluses__field-item--text">Хранение денежных средств на резервном счете торговой площадки на протяжении всей сделки</p>
          </div>
          <div className="about-view-pluses__field-item about-view-pluses__questions">
            <img src="/static/images/about/red_check.svg" />
            <p className="about-view-pluses__field-item--text">Взятие на себя полной ответственности за каждую сделку.
              Все спорные вопросы решаются быстро и справедливо
            </p>
          </div>
          <div className="about-view-pluses__field-item about-view-pluses__risk">
            <img src="/static/images/about/red_check.svg" />
            <p className="about-view-pluses__field-item--text">Отсутствие рисков как для покупателя, так
              и для продавца
            </p>
          </div>
          <div className="about-view-pluses__field-item about-view-pluses__auto">
            <img src="/static/images/about/red_check.svg" />
            <p className="about-view-pluses__field-item--text">Автоматический расчет доставки
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutView
