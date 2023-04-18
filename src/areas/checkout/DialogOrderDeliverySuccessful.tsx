import ButtonLink from "app/components/UI/Button/ButtonLink"
import DialogLayout from "app/layouts/Modal/DialogLayout/DialogLayout"
import { useModalContext } from "react-modal-global"

function DialogOrderDeliverySuccessful() {
  const modal = useModalContext()
  return (
    <DialogLayout width="30em" centered>
      <h3 >
        Данные приняты. <br />
        В ближайшее время с вами свяжется представитель службы доставки!
      </h3>
      <ButtonLink outline to="/" onClick={modal.close}>На главную</ButtonLink>
    </DialogLayout>
  )
}

export default DialogOrderDeliverySuccessful