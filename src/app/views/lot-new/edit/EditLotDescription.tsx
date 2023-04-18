import Textarea from "app/components/UI/Textarea/Textarea"
import { inputValue } from "utils/common"

import { lotDraftStorage } from "."

function EditLotDescription() {
  const [description, setDescription] = lotDraftStorage.state("description", "")
  return (
    <section>
      <h4>Описание лота</h4>
      <p>
        В описании необходимо отразить состояние лота, продолжительность владения, наличие нюансов и
        дефектов, габаритные размеры при междугородней доставке
      </p>
      <Textarea rows={16} placeholder="Описание..." defaultValue={description} onChange={inputValue(setDescription)}>Расскажите подробнее о выставляемом лоте</Textarea>
    </section>
  )
}

export default EditLotDescription