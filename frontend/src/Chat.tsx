import { useEffect, useState } from "react"
import { ChatMessage, getChatMessages, sendChatMessage } from "./api"

const maxMessagelength = 100
const maxUsernameLength = 25

export const ChatView = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [message, setMessage] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      getChatMessages().then(setMessages)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const sendMessage = async () => {
    if (!message || !username) {
      return
    }
    if (message.length > maxMessagelength) {
      alert(`message too long. max length is ${maxMessagelength}`)
      return
    }
    if (username.length > maxUsernameLength) {
      alert(`username too long. max length is ${maxUsernameLength}`)
      return
    }
    setMessages([...messages, { username, message }])
    setMessage("")
    await sendChatMessage({ username, message })
    getChatMessages().then(setMessages)
  }

  return <div style={{ "display": "flex", "flexDirection": "column", "width": "25vh", "height": "25vh", "overflow": "auto" }}>
    <span>chat</span>
    <div style={{ "display": "flex", "flexDirection": "column" }}>
      {messages.map((message, index) => <div key={index}>
        <span>{message.username}: </span>
        <span>{message.message}</span>
      </div>)}
    </div>
    <input value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
    <input value={message} onChange={e => setMessage(e.target.value)} placeholder="message" />
    <button onClick={sendMessage}>send</button>
  </div>
}