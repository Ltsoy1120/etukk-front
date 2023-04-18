import "./Chat.scss"

import { UserSigned } from "infrastructure/persistence/redux/reducers/user/types"
import { Dispatch, useState } from "react"

import { ChatMessageType } from "./Chat.types"
import ChatMessage from "./ChatMessage"
import ChatSend from "./ChatSend"

interface ChatProps {
  recipient: Pick<UserSigned, "firstName" | "avatar">
  messages: ChatMessageType[]
  onSubmit?: Dispatch<string>
}

function Chat(props: ChatProps) {
  const [messages, setMessages] = useState(props.messages)
  async function onSubmit(message: string) {
    await props.onSubmit?.(message)
    setMessages([...messages, { date: new Date, message, onRight: true }])
  }
  return (
    <div className="chat">
      <div className="chat-recipient">
        <img src={props.recipient.avatar} alt="avatar" className="chat-recipient__avatar" />
        <div className="chat-recipient__name">{props.recipient.firstName}</div>
      </div>
      <div className="chat__field">
        {messages.map((message, index) => (
          <ChatMessage {...message} key={index} />
        ))}
      </div>
      <ChatSend onSubmit={onSubmit} />
    </div>
  )
}

export default Chat
