import Button from "app/components/UI/Button/Button"
import DialogLayout from "app/layouts/Modal/DialogLayout/DialogLayout"
import {useModalContext} from "react-modal-global"

function DialogBidAccepted() {
  const {close} = useModalContext()
  return (
    <DialogLayout centered width="25em">
      <h3>Ваша ставка принята</h3>
      <Button onClick={close}>Ок</Button>
    </DialogLayout>
  )
}

export default DialogBidAccepted

export function DialogError() {
  const {close} = useModalContext()
  return (
    <DialogLayout centered width="25em">
      <h3>Ошибка! Вы пытались перебить собственную ставку</h3>
      <Button onClick={close}>Ок</Button>
    </DialogLayout>
  )
}
