import axios from 'axios'

interface Payload {
  text: string
}

interface ResponseData {
  success: boolean
  message: string
}

export const summarize = async (payload: Payload): Promise<ResponseData> => {
  // summarization
  try {
    const response = await axios.post<ResponseData>('http://127.0.0.1:8000/summarize', payload)
    return response.data
  } catch (error) {
    console.error('Error sending data:', error)
    throw error
  }
}

export const find_nationalities = async (payload: Payload): Promise<ResponseData> => {
  // summarization
  try {
    const response = await axios.post<ResponseData>('http://127.0.0.1:8000/find_nationalities', payload)
    return response.data
  } catch (error) {
    console.error('Error sending data:', error)
    throw error
  }
}