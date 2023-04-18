// import "./FullscreenAuth.scss"

import NewPassword from "app/components/containers/Password/NewPassword"
import Button from "app/components/UI/Button/Button"
import Input from "app/components/UI/Input/Input"
import Form, { FormState } from "app/layouts/Form/Form"
import FullscreenLayout from "app/layouts/Modal/FullscreenLayout/FullscreenLayout"
import { isValidResponse } from "infrastructure/persistence/api/client"
import { postPasswordResetByToken } from "infrastructure/persistence/api/data/actions"
import { useClient } from "react-fetching-library"
import { useModalContext } from "react-modal-global"

enum FormInputs {
  password = "new_password",
}

interface FullscreenPasswordRecoveryProps {
  recoveryToken: string
}

function FullscreenPasswordRecovery(props: FullscreenPasswordRecoveryProps) {
  const modal = useModalContext()
  const client = useClient()
  async function onSubmit(state: FormState<FormInputs, string>) {
    const response = await client.query(postPasswordResetByToken(props.recoveryToken, state.values))

    if (!isValidResponse(response)) return

    modal.close()
  }
  return (
    <FullscreenLayout className="fullscreen-auth">
      <div className="center">
        <h3 className="heading">Восстановление пароля</h3>
        <Form onSubmit={onSubmit}>
          <br />
          <br />
          <NewPassword name={FormInputs.password} width="21.25em" />
          <br />
          <div style={{ display: "grid", margin: "auto", width: "11em" }}><Button type="submit">Сохранить</Button></div>
        </Form>
      </div>
    </FullscreenLayout>
  )
}

export default FullscreenPasswordRecovery
