import Button from "app/components/UI/Button/Button"
import Checkbox from "app/components/UI/Checkbox/Checkbox"
import Buttons from "app/layouts/Buttons/Buttons"
import DialogLayout from "app/layouts/Modal/DialogLayout/DialogLayout"
import {isValidResponse} from "infrastructure/persistence/api/client"
import {patchUser} from "infrastructure/persistence/api/data/actions"
import {mapUser} from "infrastructure/persistence/api/mappings/user"
import {userUpdate} from "infrastructure/persistence/redux/reducers/user"
import {useLayoutEffect, useState} from "react"
import {useClient} from "react-fetching-library"
import {useModalContext} from "react-modal-global"
import {useDispatch} from "react-redux"
import {useLocalStorage} from "react-use"

interface DialogConfirmBidUpProps {
  onSubmit(): void
}

function DialogConfirmBidUp(props: DialogConfirmBidUpProps) {
  const dispatch = useDispatch()
  const [bidUpConfirm, setBidUpConfirm] = useState(true)
  const client = useClient()
  const modal = useModalContext()
  async function onSubmit() {
    const response = await client.query(
      patchUser({bet_confirmation: bidUpConfirm})
    )
    dispatch(userUpdate(mapUser(response.payload)))
    if (!isValidResponse(response)) return
    props.onSubmit()
    modal.close()
  }
  function onCheckboxChange() {
    setBidUpConfirm(!bidUpConfirm)
  }

  useLayoutEffect(() => {
    if (bidUpConfirm === false) onSubmit()
  }, [])

  return (
    <DialogLayout centered>
      <h3>Подтвердите повышение ставки</h3>
      <Checkbox defaultChecked={!bidUpConfirm} onChange={onCheckboxChange}>
        Больше не запрашивать подтверждение о повышении ставки
      </Checkbox>
      <Buttons>
        <Button outline onClick={close}>
          Отмена
        </Button>
        <Button onClick={onSubmit}>Поднять</Button>
      </Buttons>
    </DialogLayout>
  )
}

export default DialogConfirmBidUp
