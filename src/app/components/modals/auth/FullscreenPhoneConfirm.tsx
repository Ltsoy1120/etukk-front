// import "./FullscreenAuth.scss"

import Button from "app/components/UI/Button/Button"
import Input from "app/components/UI/Input/Input"
import Buttons from "app/layouts/Buttons/Buttons"
import FullscreenLayout from "app/layouts/Modal/FullscreenLayout/FullscreenLayout"
import { Modal } from "react-modal-global"

import FullscreenEmailConfirm from "./FullscreenEmailConfirm"

function FullscreenPhoneConfirm() {
  return (
    <FullscreenLayout className="fullscreen-auth">
      <div className="center">
        <h3 className="heading">ПОДТВЕРДИТЕ <br /> НОМЕР ТЕЛЕФОНА</h3>
        <p>
          В течение 1 минуты на указанный номер <br /> телефона придет СМС сообщение
          <br />
          с 4 значным кодом.
          <br />
          <br />
          Введите его в форму подтвержения.
        </p>
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Buttons>
            <Input width="2.5em" />
            <Input width="2.5em" />
            <Input width="2.5em" />
            <Input width="2.5em" />
            <br />
          </Buttons>
        </div>
        <br />
        <br />
        <a className="gray">Отправить код еще раз</a>
        <br />
        <br />
        <br />
        <br />
        <Button aria- onClick={() => Modal.replace(FullscreenEmailConfirm)}>Подтвердить</Button>
      </div>
    </FullscreenLayout>
  )
}

export default FullscreenPhoneConfirm
