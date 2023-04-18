import ButtonLink from "app/components/UI/Button/ButtonLink"
import DialogLayout from "app/layouts/Modal/DialogLayout/DialogLayout"
import { useModalContext } from "react-modal-global"

function DialogReportAccepted() {
  const modal = useModalContext()
  return (
    <DialogLayout centered>
      <h3>Ваша жалоба принята!</h3>
      <ButtonLink outline to="/" onClick={modal.close}>На главную</ButtonLink>
    </DialogLayout>
  )
}

export default DialogReportAccepted
