import Button from "app/components/UI/Button/Button"
import Buttons from "app/layouts/Buttons/Buttons"
import DialogLayout from "app/layouts/Modal/DialogLayout/DialogLayout"
import { useModalContext } from "react-modal-global"

function DialogArchiveLot(props: { onSubmit(): void; }) {
  const { close } = useModalContext()
  function onSubmit() {
    props.onSubmit()
    close()
  }
  return (
    <DialogLayout centered width="27em">
      <h3>Лот будет снят с публикации и перемещен  в папку “АРХИВ”</h3>
      <Buttons>
        <Button outline onClick={close}>Отмена</Button>
        <Button onClick={onSubmit}>Ок</Button>
      </Buttons>
    </DialogLayout>
  )
}

export default DialogArchiveLot
