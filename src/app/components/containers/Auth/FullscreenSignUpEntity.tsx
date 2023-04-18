import "./FullscreenAuth.scss"

import NewPassword from "app/components/containers/Password/NewPassword"
import Button from "app/components/UI/Button/Button"
import ButtonLink from "app/components/UI/Button/ButtonLink"
import Checkbox from "app/components/UI/Checkbox/Checkbox"
import Input from "app/components/UI/Input/Input"
import {Column} from "app/layouts/BaseLayouts/BaseLayouts"
import Form, {FormState} from "app/layouts/Form/Form"
import FullscreenLayout from "app/layouts/Modal/FullscreenLayout/FullscreenLayout"
import {postRegistrationUser} from "infrastructure/persistence/api/data/actions"
import TemporaryStorage from "infrastructure/persistence/TemporaryStorage"
import {useState} from "react"
import {useMutation} from "react-fetching-library"
import ReCAPTCHA from "react-google-recaptcha"
import {Modal} from "react-modal-global"
import {Link} from "react-router-dom"
import {inputValue} from "utils/common"

import FullscreenEmailConfirm from "../../modals/auth/FullscreenEmailConfirm"

enum FormInputs {
  fullName = "fullname",
  inn = "inn",
  email = "email",
  phone = "phonenumber",
  password = "password",
}

function FullscreenSignUpEntity() {
  const {mutate: signUp} = useMutation(postRegistrationUser)
  const [validity, setValidity] = useState(false)

  const registerStorage = new TemporaryStorage("register")
  const [fullname, setFullname] = registerStorage.state("fullname", "")
  const [inn, setInn] = registerStorage.state("inn", "")
  const [email, setEmail] = registerStorage.state("email", "")
  const [phone, setPhone] = registerStorage.state("phone", "")
  const [reCaptcha, setReCaptcha] = registerStorage.state("reCaptcha", false)

  async function onSubmit(state: FormState<FormInputs, string>) {
    const {error, payload} = await signUp({
      ...state.values,
      organization: true,
    })

    if (error) return
    if (payload == null) return

    localStorage.setItem("token", payload.access_token)
    registerStorage.clear()
    Modal.replace(FullscreenEmailConfirm)
  }

  return (
    <FullscreenLayout className="fullscreen-auth" isPage>
      <h3 className="heading center">Регистрация</h3>
      <Form
        centered
        onChange={event => setValidity(event.currentTarget.checkValidity())}
        onSubmit={onSubmit}>
        <Column>
          <Input
            placeholder="Название организации"
            name={FormInputs.fullName}
            width="20em"
            required
            defaultValue={fullname}
            onChange={inputValue(setFullname)}
          />
          <Input
            placeholder="ИНН"
            name={FormInputs.inn}
            width="20em"
            required
            defaultValue={inn}
            onChange={inputValue(setInn)}
          />
          <Input
            placeholder="Номер телефона"
            name={FormInputs.phone}
            defaultValue={phone ?? "+7"}
            maxLength={11}
            width="20em"
            type="tel"
            required
            onChange={inputValue(setPhone)}
          />
          <Input
            placeholder="Е-mail"
            name={FormInputs.email}
            width="20em"
            type="email"
            required
            autoComplete="username"
            defaultValue={email}
            onChange={inputValue(setEmail)}
          />
          <NewPassword name={FormInputs.password} width="20em" />
          <ReCAPTCHA
            sitekey="6Lc5tBgfAAAAAC1ZVB3wW7Srz56N6RQiEufFPVRi"
            onChange={value => setReCaptcha(!!value)}
          />
          <Checkbox required>
            <Link to="/terms" onClick={() => setReCaptcha(true)}>
              Принимаю условия соглашения
            </Link>
          </Checkbox>
          <div>
            <Button type="submit" disabled={!validity || !reCaptcha}>
              Регистрация
            </Button>
          </div>
        </Column>
      </Form>
      <ButtonLink
        color="white"
        to="/login"
        onClick={() => registerStorage.clear()}>
        Войти
      </ButtonLink>
    </FullscreenLayout>
  )
}

export default FullscreenSignUpEntity
