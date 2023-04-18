import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Button from "app/components/UI/Button/Button"
import Input from "app/components/UI/Input/Input"
import Form, {FormState} from "app/layouts/Form/Form"
import {getUser, patchUser} from "infrastructure/persistence/api/data/actions"
import {mapUser} from "infrastructure/persistence/api/mappings/user"
import {userUpdate} from "infrastructure/persistence/redux/reducers/user"
import {useClient} from "react-fetching-library"
import {useDispatch, useSelector} from "react-redux"

const typeText = {
  user: "Частное лицо",
  organization: "Организация",
} as const

enum FormInputs {
  fullname = "fullname",
  email = "email",
  phone = "phonenumber",
  password = "password",
}

function ProfilePersonalMe() {
  const dispatch = useDispatch()
  const client = useClient()
  const user = useSelector(state => (state.user.auth ? state.user : undefined))

  async function onSubmit(state: FormState<FormInputs, string>) {
    if (user == null) return

    const {error, payload} = await client.query(patchUser(state.values))
    if (error) return
    if (payload == null) return

    dispatch(userUpdate(mapUser(payload)))
  }
  return (
    <>
      <h5 className="heading">Личная информация</h5>
      <QueryContainer action={getUser()}>
        {user => (
          <Form gap="2em" onSubmit={onSubmit}>
            <Input
              placeholder="Имя"
              defaultValue={user?.fullname}
              name={FormInputs.fullname}
              width="25em"
            />
            <Input
              defaultValue={
                user?.organization ? typeText.organization : typeText.user
              }
              readOnly
              width="25em"
            />
            <Input
              placeholder="Email"
              type="email"
              defaultValue={user?.email as string}
              name={FormInputs.email}
              width="25em"
            />
            <Input
              placeholder="Телефон"
              type="tel"
              defaultValue={user?.phonenumber}
              name={FormInputs.phone}
              width="25em"
            />
            <div>
              <Button type="submit">Сохранить</Button>
            </div>
          </Form>
        )}
      </QueryContainer>
    </>
  )
}

export default ProfilePersonalMe
