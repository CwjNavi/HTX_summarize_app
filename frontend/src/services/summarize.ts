import axios from 'axios'

interface Payload {
  text: string
}

interface ResponseData {
  success: boolean
  message: string
}

export const send = async (payload: Payload): Promise<ResponseData> => {
  try {
    const response = await axios.post<ResponseData>('https://your-backend.com/api/send', payload)
    return response.data
  } catch (error) {
    console.error('Error sending data:', error)
    throw error
  }
}