import ButtonLink from "app/components/UI/Button/ButtonLink"
import DialogLayout from "app/layouts/Modal/DialogLayout/DialogLayout"
import { useModalContext } from "react-modal-global"

function DialogReviewAccepted() {
  const { close } = useModalContext()
  return (
    <DialogLayout centered width="25em">
      <h3>Ваш отзыв отправлен! Вперед за новыми покупками?</h3>
      <ButtonLink to="/" onClick={close}>На главную</ButtonLink>
    </DialogLayout>
  )
}

export default DialogReviewAccepted
