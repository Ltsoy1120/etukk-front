import NewPassword from "app/components/containers/Password/NewPassword"
import FullscreenPasswordRecoveryRequest from "app/components/modals/auth/FullscreenPasswordRecoveryRequest"
import Button from "app/components/UI/Button/Button"
import Input from "app/components/UI/Input/Input"
import Form, { FormState } from "app/layouts/Form/Form"
import { DialogPasswordRecoverLinkSent } from "app/views/lot/modals/DialogPasswordRecoverLinkSent"
import { isValidResponse } from "infrastructure/persistence/api/client"
import { patchUserByUserId, postPasswordReset } from "infrastructure/persistence/api/data/actions"
import { useState } from "react"
import { useClient } from "react-fetching-library"
import { Modal } from "react-modal-global"
import { useSelector } from "react-redux"

enum FormInputs {
  passwordOld = "password_old",
  password = "password",
}

function ProfilePersonalPasswordChange() {
  const client = useClient()
  const user = useSelector(state => state.user)
  const [validity, setValidity] = useState(false)
  // async function onSubmit(state: FormState<FormInputs, string>) {
  //   if (!user.auth) return

  //   const { error } = await client.query(patchUserByUserId(user.id, state.values))
  //   if (error) return


  // }
  async function requestPasswordRecovery() {
    if (!user.auth) return

    const response = await client.query(postPasswordReset(user.email))

    if (!isValidResponse(response)) return

    Modal.open(DialogPasswordRecoverLinkSent)
  }
  return (
    <>
      <h5 className="heading">Смена пароля</h5>
      <div>
        <Button await onClick={requestPasswordRecovery}>Сменить пароль</Button>
      </div>
      {/* <Form gap="2em" onChange={event => setValidity(event.currentTarget.checkValidity())} onSubmit={onSubmit}>
        <Input name={FormInputs.passwordOld} type="password" placeholder="Текущий пароль" autoComplete="current-password" />
        <NewPassword name={FormInputs.password} />
        <div><Button type="submit" disabled={!validity}>Сохранить</Button></div>
      </Form> */}
    </>
  )
}

export default ProfilePersonalPasswordChange