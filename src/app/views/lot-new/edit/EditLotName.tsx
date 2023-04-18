import Input from "app/components/UI/Input/Input"
import {inputValue} from "utils/common"

import {lotDraftStorage} from "."

function EditLotName() {
  const [title, setTitle] = lotDraftStorage.state("title", "")
  function updateTitle(value: string) {
    value = value.trimStart()
    value = value.replace(/ +/g, " ")
    setTitle(value)
  }

  return (
    <section>
      <h4>Название лота</h4>
      <p>*не менее 5 и не более 40 символов, слова не более 20 символов</p>
      <p>*наличие букв обязательно</p>
      <Input
        width="25em"
        placeholder="Напишите  название лота..."
        type="text"
        value={title}
        maxLength={40}
        onChange={inputValue(updateTitle)}
        validity
      />
    </section>
  )
}

export default EditLotName
