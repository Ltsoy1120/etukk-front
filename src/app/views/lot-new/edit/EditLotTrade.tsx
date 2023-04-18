import QueryContainer from "app/components/containers/QueryContainer/QueryContainer"
import Input from "app/components/UI/Input/Input"
import InputAddress from "app/components/UI/Input/InputAddress"
import Radio from "app/components/UI/Radio/Radio"
import Selector from "app/components/UI/Selector/Selector"
import {Row} from "app/layouts/BaseLayouts/BaseLayouts"
import {getTimes} from "infrastructure/persistence/api/data/actions"
import {inputValue} from "utils/common"
import {humanizeDate} from "utils/date"

import {lotDraftStorage} from "."

function EditLotTrade() {
  const [date, setDate] = lotDraftStorage.state("date", "")
  const [price, setPrice] = lotDraftStorage.state("price", "")
  const [city, setCity] = lotDraftStorage.state("city", "")
  const [delivery, setDelivery] = lotDraftStorage.state("delivery", "all")
  return (
    <section>
      <h2>Торги и доставка</h2>
      <p>Период публикации лота и проведения торгов</p>
      <QueryContainer action={getTimes()}>
        {payload => (
          <>
            {payload.map((time, index) => (
              <div key={index}>
                <Radio
                  name="date"
                  value={index.toString()}
                  defaultChecked={date === index.toString()}
                  onChange={setDate}>
                  {new Date().getDate() === new Date(time.begin).getDate()
                    ? "Сегодня"
                    : new Date().getDate() + 1 ===
                      new Date(time.begin).getDate()
                    ? "Завтра"
                    : "Послезавтра"}{" "}
                  {humanizeDate(new Date(time.begin))} -{" "}
                  {new Date(time.end).toLocaleString("ru", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Radio>
                <br />
              </div>
            ))}
          </>
        )}
      </QueryContainer>
      <br />
      <Row>
        <Input
          type="number"
          iconName="rub"
          placeholder="Введите  сумму..."
          maxLength={7}
          min="1000"
          validity
          width="18em"
          defaultValue={price}
          onChange={inputValue(setPrice)}>
          Укажите начальную стоимость лота{" "}
          <span style={{color: "#bcc2c7"}}>(от 1000р)</span>
        </Input>
        <InputAddress
          placeholder="Укажите полный адрес отправки..."
          validity
          defaultValue={city}
          onChange={inputValue(setCity)}>
          Укажите полный адрес отправки
        </InputAddress>
      </Row>
      <br />
      <br />
      <Selector
        label="Выберите вариант возможной доставки"
        defaultValue={delivery}
        onChange={setDelivery}>
        <option value="all">Доставка в регионы</option>
        <option value="local">Доставка по городу продажи</option>
      </Selector>
    </section>
  )
}

export default EditLotTrade
