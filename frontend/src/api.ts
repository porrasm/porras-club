import axios from "axios";

export type PasswordForService = {
  id: number
  service: string
  login: string
  password: string
}

export type ChatMessage = {
  username: string
  message: string
}

const baseUrl = "/api"

export const getPasswords = async (): Promise<PasswordForService[]> => {
  const response = await axios.get(baseUrl + "/passwords")
  console.log("received: ", response.data)
  return response.data
}

export const savePassword = async (pass: PasswordForService) => {
  await axios.post(baseUrl + "/passwords", {}, { params: pass })
}

export const deletePassword = async (id: number) => {
  await axios.delete(baseUrl + "/passwords", { params: { id } })
}

export const getChatMessages = async (): Promise<ChatMessage[]> => {
  const response = await axios.get(baseUrl + "/chat")
  return response.data
}

export const sendChatMessage = async (msg: ChatMessage) => {
  await axios.post(baseUrl + "/chat", {}, { params: msg })
}