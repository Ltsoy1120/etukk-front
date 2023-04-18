import Input, { InputConstraint } from "app/components/UI/Input/Input"
import _ from "lodash"
import { useState } from "react"
import { inputValue } from "utils/common"

const PASSWORD_MISMATCH = "Пароли не совпадают!"
const constraints: InputConstraint[] = [
  [/.{8,}/, "Пароль должен быть не короче 8 символов."],
  [/(?=.*[a-z])(?=.*[A-Z])/, "Пароль должен cодержать заглавные и прописные буквы."],
  [/[@#$%&*!]/, "Пароль должен cодержать спец. символы (@ # $ % & * !)."],
]

// // Пароль должен содержать 8 символов, заглавные, прописные буквы и символы (@#$%&*!).

interface NewPasswordProps {
  name?: string
  confirmName?: string
  width?: string

  new?: boolean
}

function NewPassword(props: NewPasswordProps) {
  const [hidden, setHidden] = useState(true)
  const [password, setPassword] = useState("")
  const inputProps = {
    type: hidden ? "password" : "text",

    iconName: "eye",
    onIconClick: () => setHidden(!hidden),

    required: true,
    autoComplete: "new-password",
    ..._.omit(props, "nameConfirm"),
  }
  const placeholder = props.new ? "Новый пароль" : "Пароль"
  return (
    <>
      <Input {...inputProps} constraints={constraints} placeholder={placeholder} value={password} onChange={inputValue(setPassword)} name={props.name}>
        Пароль должен содержать 8 символов, заглавные, прописные буквы и символы (@#$%&*!)
      </Input>
      <Input {...inputProps} constraints={[[password, PASSWORD_MISMATCH]]} placeholder={"Повторите " + placeholder} name={props.confirmName} />
    </>
  )
}

export default NewPassword
