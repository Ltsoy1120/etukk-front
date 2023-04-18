import Icon from "app/components/UI/Icon/Icon"
import Loader from "app/components/UI/Loader/Loader"
import { Dispatch, FormEvent, useState } from "react"
import { classWithModifiers } from "utils/common"

import ChatInput from "./ChatInput"

interface ChatSendProps {
  onSubmit?: Dispatch<string>
}

function ChatSend(props: ChatSendProps) {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (message.trim().length === 0) return

    setPending(true)
    await props.onSubmit?.(message)
    setPending(false)

    setMessage("")
  }
  return (
    <form className="chat-send" onSubmit={onSubmit}>
      <ChatInput value={message} onChange={setMessage} />
      <button className={classWithModifiers("chat-send__button", pending && "pending")} disabled={pending} type="submit">
        <Icon name="send" />
        <Loader className="chat-send__loader" />
      </button>
    </form>
  )
}

export default ChatSend
