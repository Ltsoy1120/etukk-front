import "./FullscreenAuth.scss"

import Password from "app/components/containers/Password/Password"
import FullscreenPasswordRecoveryRequest from "app/components/modals/auth/FullscreenPasswordRecoveryRequest"
import Button from "app/components/UI/Button/Button"
import ButtonLink from "app/components/UI/Button/ButtonLink"
import Input from "app/components/UI/Input/Input"
import SocialAuth from "app/components/UI/SocialAuth/SocialAuth"
import {Column} from "app/layouts/BaseLayouts/BaseLayouts"
import Form, {FormState} from "app/layouts/Form/Form"
import FullscreenLayout from "app/layouts/Modal/FullscreenLayout/FullscreenLayout"
import {postAuthUser} from "infrastructure/persistence/api/data/actions"
import {userFetch} from "infrastructure/persistence/redux/reducers/user"
import {useState} from "react"
import {useMutation} from "react-fetching-library"
import {Modal} from "react-modal-global"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"

enum FormInputs {
  email = "email",
  password = "password",
}

function FullscreenSignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [validity, setValidity] = useState(false)
  const {mutate: signIn} = useMutation(postAuthUser)

  async function onSubmit(state: FormState<FormInputs, string>) {
    const {error, payload} = await signIn(state.values)
    if (error) return
    if (payload == null) return

    dispatch(userFetch(payload))
    navigate("/")
  }

  return (
    <FullscreenLayout className="fullscreen-auth" isPage>
      <h3 className="heading" style={{textAlign: "center"}}>
        ВХОД
      </h3>
      <SocialAuth />
      <Form
        centered
        onChange={event => setValidity(event.currentTarget.checkValidity())}
        onSubmit={onSubmit}>
        <Column>
          <Input
            name={FormInputs.email}
            width="20em"
            placeholder="Е-mail или номер телефона"
            required
          />
          <Password name={FormInputs.password} width="20em" />
          <a
            className="gray"
            onClick={() => Modal.open(FullscreenPasswordRecoveryRequest)}>
            Забыли пароль?
          </a>
          <div>
            <Button type="submit" disabled={!validity}>
              Войти
            </Button>
          </div>
        </Column>
      </Form>
      <ButtonLink color="white" to="/register">
        Регистрация
      </ButtonLink>
    </FullscreenLayout>
  )
}

export default FullscreenSignIn
