import ChooseImage, {
  ImageFiles,
} from "app/components/UI/ChooseImage/ChooseImage"
import Input from "app/components/UI/Input/Input"
import {inputValue} from "utils/common"

import {lotDraftStorage} from "."

function EditLotFiles() {
  const [video, setVideo] = lotDraftStorage.state("video", "")

  const [files, setFiles] = lotDraftStorage.state<ImageFiles>("files", [])

  if (files.some(image => !(image instanceof File))) {
    setFiles([])
    files.length = 0
  }
  return (
    <section>
      <h4>Фото и видео лота</h4>
      <p>
        Уважаемый пользователь, обращаем Ваше внимание на то, что при
        расширенном описании своего товара и характеристик, у Вас будет
        конкурентное преимущество продать его выгодней и быстрей
      </p>
      <h4>Фото (минимум 4 шт.)</h4>
      <ChooseImage create defaultValue={files} onChange={setFiles} />
      <h4>Видео</h4>
      <p>Вставьте ссылку на видео в YouTube</p>
      <p>
        По нашим данным размещение лота с видео повышает цену продажи на 16 % и
        более
      </p>
      <Input
        placeholder="Ссылка на видео..."
        width="75%"
        defaultValue={video}
        onChange={inputValue(setVideo)}
      />
    </section>
  )
}

export default EditLotFiles
