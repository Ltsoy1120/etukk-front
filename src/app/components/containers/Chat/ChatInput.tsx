import Icon from "app/components/UI/Icon/Icon"
import { Dispatch } from "react"

interface ChatInputProps {
  value?: string
  onChange?: Dispatch<string>
}

function ChatInput(props: ChatInputProps) {
  return (
    <label className="chat-input">
      <input type="text" autoComplete="message" placeholder="Ваше сообщение..." className="chat-input__input" value={props.value} onChange={event => props.onChange?.(event.currentTarget.value)} />
      <div className="chat-input__buttons">
        <button className="chat-input__button">
          <Icon name="clip" />
        </button>
        <button className="chat-input__button">
          <Icon name="smile" />
        </button>
      </div>
    </label>
  )
}

export default ChatInput
