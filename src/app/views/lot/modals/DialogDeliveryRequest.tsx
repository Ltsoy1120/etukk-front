import ButtonLink from "app/components/UI/Button/ButtonLink"
import DialogLayout from "app/layouts/Modal/DialogLayout/DialogLayout"
import { useModalContext } from "react-modal-global"


export function DialogDeliveryRequest() {
  const { close } = useModalContext()
  return (
    <DialogLayout centered width="25em">
      <h3>Данные приняты.<br /> В ближайшее время с вами свяжется представитель службы доставки!</h3>
      <ButtonLink outline to="/" onClick={close}>На главную</ButtonLink>
    </DialogLayout>
  )
}
