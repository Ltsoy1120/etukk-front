import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Button from "app/components/UI/Button/Button"
import Icon from "app/components/UI/Icon/Icon"
import Selector from "app/components/UI/Selector/Selector"
import TextareaAttachments from "app/components/UI/Textarea/TextareaAttachments"
import Form, {FormState} from "app/layouts/Form/Form"
import PopupLayout from "app/layouts/Modal/PopupLayout/PopupLayout"
import {isValidResponse} from "infrastructure/persistence/api/client"
import {
  postLotClaim,
  postLotClaimReasons,
} from "infrastructure/persistence/api/data/actions"
import {useState} from "react"
import {useClient} from "react-fetching-library"
import {useModalContext} from "react-modal-global"
import {Modal} from "react-modal-global"

import DialogReportAccepted from "./DialogReportAccepted"

enum FormInputs {
  feedback = "feedback",
  feedbackAttachments = "feedback-attachments", //* NOT FOR USAGE

  reason = "reason",
}

interface FormValues {
  feedback: string
  "feedback-attachments": string[]

  reason: string
}

interface PopupReportProps {
  lotId: number
}

function PopupReport(props: PopupReportProps) {
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

    Modal.replace(DialogReportAccepted, {closable: false})
  }
  return (
    <PopupLayout width="46.25em">
      <Form onSubmit={onSubmit}>
        <div>
          <Icon name="attention" size="3.5em" color="red" />
        </div>
        <h2>Пожаловаться</h2>
        {/* <QueryContainer action={postLotClaimReasons()}>
          {payload => (
            <Selector name={FormInputs.reason}>
              {payload.map(reason => (
                <option value={reason.name} key={reason.id}>{reason.name}</option>
              ))}
            </Selector>
          )}
        </QueryContainer> */}
        <TextareaAttachments
          name={FormInputs.feedback}
          placeholder="Введите комментарий ..."
          onChange={files => setFiles(files)}>
          Кратко опишите причину по которой
          <br />
          Вы решили пожаловаться на объявление
        </TextareaAttachments>
        <div>
          <Button type="submit" pending={pending}>
            Открыть спор по товару
          </Button>
        </div>
      </Form>
    </PopupLayout>
  )
}

export default PopupReport
