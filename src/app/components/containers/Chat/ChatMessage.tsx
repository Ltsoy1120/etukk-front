import { classWithModifiers } from "utils/common"

import { ChatMessageType } from "./Chat.types"

interface ChatMessageProps extends ChatMessageType { }

function ChatMessage(props: ChatMessageProps) {
  const date = new Date(props.date)
  const localeDateString = date.toLocaleDateString("ru")
  return (
    <div className={classWithModifiers("chat-message", props.onRight && "on-right")}>
      <div className="chat-message__message">
        <p className="chat-message__text">{props.message}</p>
      </div>
      <time className="chat-message__date-time" dateTime={localeDateString}>{localeDateString}</time>
    </div>
  )
}

export default ChatMessage
