import ButtonLink from "app/components/UI/Button/ButtonLink"
import DialogLayout from "app/layouts/Modal/DialogLayout/DialogLayout"
import { useModalContext } from "react-modal-global"

function DialogCallACourierSuccessful() {
  const modal = useModalContext()
  return (
    <DialogLayout width="30em" centered>
      <h3 >
        Завка на забор груза принята. <br />
        В ближайшее время с Вами свяжется курьер.
      </h3>
      <ButtonLink outline to="/" onClick={modal.close}>На главную</ButtonLink>
    </DialogLayout>
  )
}

export default DialogCallACourierSuccessful