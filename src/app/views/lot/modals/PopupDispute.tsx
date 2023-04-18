import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Button from "app/components/UI/Button/Button"
import Selector from "app/components/UI/Selector/Selector"
import TextareaAttachments from "app/components/UI/Textarea/TextareaAttachments"
import ToolTipBadge from "app/components/UI/ToolTipBadge/ToolTipBadge"
import You from "app/components/UI/You/You"
import Buttons from "app/layouts/Buttons/Buttons"
import Form, {FormState} from "app/layouts/Form/Form"
import PopupLayout from "app/layouts/Modal/PopupLayout/PopupLayout"
import {isValidResponse} from "infrastructure/persistence/api/client"
import {
  postLotClaim,
  postLotClaimReasons,
} from "infrastructure/persistence/api/data/actions"
import {useState} from "react"
import {useClient} from "react-fetching-library"
import {Modal} from "react-modal-global"

import DialogDisputeAccepted from "./DialogDisputeAccepted"

enum FormInputs {
  reason = "reason",

  feedback = "feedback",
  feedbackAttachments = "feedback-attachments", //* NOT FOR USAGE
}

interface FormValues {
  reason: string

  feedback: string
  "feedback-attachments": string[]
}

interface PopupDisputeProps {
  lotId: number
}

function PopupDispute(props: PopupDisputeProps) {
  const [pending, setPending] = useState(false)
  const client = useClient()
  const [files, setFiles] = useState<string[]>([])

  async function onSubmit(state: FormState<FormInputs, FormValues>) {
    setPending(true)
    const response = await client.query(
      postLotClaim({
        to_lot_id: props.lotId,
        text: state.values.feedback,
        reason: state.values.reason,
        lot_claim_photos: files,
      })
    )
    setPending(false)

    if (!isValidResponse(response)) return

    Modal.replace(DialogDisputeAccepted, {closable: false})
  }

  return (
    <PopupLayout width="46.25em">
      <Form onSubmit={onSubmit}>
        <h2>Открыть спор по товару</h2>
        <You />
        <QueryContainer action={postLotClaimReasons()}>
          {payload => (
            <Selector name={FormInputs.reason}>
              {payload.map(reason => (
                <option value={reason.name} key={reason.id}>
                  {reason.name}
                </option>
              ))}
            </Selector>
          )}
        </QueryContainer>
        {/* <Selector name={FormInputs.reason} width="20em">
          <option>Товар пришел с повреждениями</option>
          <option>Не соответствует заявленным характеристикам</option>
          <option>Иная причина</option>
        </Selector> */}
        <TextareaAttachments
          maxFiles={4}
          name={FormInputs.feedback}
          rows={5}
          placeholder="Введите комментарий ..."
          onChange={files => setFiles(files)}
        />
        <Buttons>
          <Button type="submit" pending={pending}>
            Открыть спор
          </Button>
        </Buttons>
        <ToolTipBadge>
          Для закрытия сделки Вам необходимо оставить отзыв и прикрепить фото
          полученного лота.
          {"\n\n"}
          Если у Вас есть претензии по качеству товара, откройте спор.
          {"\n"}
          Для этого необходимо выбрать причину открытия, описать проблему и
          прикрепить фото и видео подтверждающие дефект или несоответствие
          товара заявленным характеристикам.
          {"\n\n"}
          ВНИМАНИЕ! Открытие спора после остановки счетчиков - невозможно!
        </ToolTipBadge>
      </Form>
    </PopupLayout>
  )
}

export default PopupDispute
