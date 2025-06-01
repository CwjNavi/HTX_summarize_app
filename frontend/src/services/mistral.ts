import axios from 'axios'

interface Payload {
  text: string
}

interface SummaryResponse {
  summary: string
}

interface NationalitiesResponse {
  nationalities: string
}

export const summarize = async (payload: Payload): Promise<SummaryResponse> => {
  // summarization
  try {
    const response = await axios.post<SummaryResponse>('http://127.0.0.1:8000/summarize', payload)
    return response.data
  } catch (error) {
    console.error('Error sending data:', error)
    throw error
  }
}

export const find_nationalities = async (payload: Payload): Promise<NationalitiesResponse> => {
  // summarization
  try {
    const response = await axios.post<NationalitiesResponse>('http://127.0.0.1:8000/find_nationalities', payload)
    return response.data
  } catch (error) {
    console.error('Error sending data:', error)
    throw error
  }
}