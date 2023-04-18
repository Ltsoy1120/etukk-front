import Input from "app/components/UI/Input/Input"
import { useState } from "react"

interface PasswordProps {
  name?: string
  width?: string
}

function Password(props: PasswordProps) {
  const [hidden, setHidden] = useState(true)
  return (
    <Input
      type={hidden ? "password" : "text"}
      iconName="eye" placeholder="Пароль"
      required
      onIconClick={() => setHidden(!hidden)}
      {...props}
    />
  )
}

export default Password
