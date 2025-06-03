import axios from 'axios'

const BASE_URL = import.meta.env.VITE_AWS_BASE_URI //|| 'http://127.0.0.1:8000';

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
    const response = await axios.post<SummaryResponse>(`${BASE_URL}/summarize`, payload)
    return response.data
  } catch (error) {
    console.error('Error sending data:', error)
    throw error
  }
}

export const find_nationalities = async (payload: Payload): Promise<NationalitiesResponse> => {
  // summarization
  try {
    const response = await axios.post<NationalitiesResponse>(`${BASE_URL}/find_nationalities`, payload)
    return response.data
  } catch (error) {
    console.error('Error sending data:', error)
    throw error
  }
}