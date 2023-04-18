import Button from "app/components/UI/Button/Button"
import DialogLayout from "app/layouts/Modal/DialogLayout/DialogLayout"
import {useModalContext} from "react-modal-global"

function DialogPayoutSuccessful() {
  const modal = useModalContext()
  return (
    <DialogLayout width="30em" centered>
      <h3>
        Спасибо, запрос на выплату принят. <br />
        Ожидайте зачисления средств
      </h3>
      <Button outline onClick={modal.close}>
        OK
      </Button>
    </DialogLayout>
  )
}

export default DialogPayoutSuccessful
