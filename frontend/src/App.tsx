import { useState } from 'react'
import './App.css'
import { ChatInput } from './components/ChatInput'
import mammoth from 'mammoth'
import { summarize, find_nationalities } from './services/mistral'
import { Nationalities } from './components/Nationalities'
import { Summary } from './components/Summary'
import { ErrorBar } from './components/ErrorBar'

const convertDocxToHtml = async (file: File | null) => {
  if (file === null) {
    return ''
  }
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
  const html = result.value; // The converted HTML string
  const messages = result.messages; // Any warnings or errors
  console.log(messages)
  return html
};


function App() {

  const [textInput, setTextInput] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>('');
  const [nationalities, setNationalities] = useState<string | null>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('POST http://localhost:5173/undefined/summarize 404 (Not Found)');

  const onSubmit = async () => {

    const getErrorMessage = (err: unknown): string => {
      if (err instanceof Error) return err.message;
      if (typeof err === 'string') return err;
      return JSON.stringify(err); // fallback
    }

    setLoading(true)
    const html = await convertDocxToHtml(file)
    const updatedQuery = textInput.concat(html)

    console.log(updatedQuery)
    setCurrentQuery(updatedQuery)

    try {
      const summary_response = await summarize({ text: updatedQuery })
      console.log(summary_response)
      setSummary(summary_response['summary'])
      const find_nationalities_response = await find_nationalities({ text: updatedQuery })
      console.log(find_nationalities_response)
      setNationalities(find_nationalities_response['nationalities'])

    } catch (err) {
      console.error('Failed to send data', err)
      setError(getErrorMessage(err))
    } finally {
      setTextInput('')
      setFile(null)
      setLoading(false)
    }
  }

  return (
    <>
      <div className='content-center'>
        <h1 className="text-5xl font-bold text-center mb-10">HTX Summarize app</h1>
        <p className='text-2xl'>Hi👋, I am Sammy! Give me some text or a file and I will summarize it for you!</p>

        <ChatInput text={textInput} file={file} onTextChange={setTextInput} onFileChange={setFile} onSubmit={onSubmit}></ChatInput>
        <ErrorBar errorMessage={error} onErrorChange={setError} currentQuery={currentQuery}></ErrorBar>
        <Summary summary={summary} isLoading={loading}></Summary>
        <Nationalities nationalities={nationalities} isLoading={loading}></Nationalities>
      </div>
    </>
  )
}

export default App
