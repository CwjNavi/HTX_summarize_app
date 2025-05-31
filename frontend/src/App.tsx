import { useState } from 'react'
import './App.css'
import { ChatInput } from './components/ChatInput'
import mammoth from 'mammoth'
import { summarize, find_nationalities } from './services/mistral'
import { Nationalities } from './components/Nationalities'
import { Summary } from './components/Summary'

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
  const [currentQuery, setCurrentQuery] = useState<string>('')
  const [summary, setSummary] = useState<string | null>('')
  const [nationalities, setNationalities] = useState<string | null>('')

  const onSubmit = async () => {
    alert('submitting!')
    const html = await convertDocxToHtml(file)
    setCurrentQuery(textInput.concat(html))

    try {
      const summary_response = await summarize({ text: currentQuery })
      console.log(summary_response)
      setSummary(summary_response['summary'])
    } catch (err) {
      console.error('Failed to send data', err)
    }

    try {
      const find_nationalities_response = await find_nationalities({ text: currentQuery })
      console.log(find_nationalities_response)
      setNationalities(find_nationalities_response['nationalities'])
    } catch (err) {
      console.error('Failed to send data', err)
    }    

    setTextInput('')
    setFile(null)
  }

  return (
    <>
      <div className='content-center'>
        <h1 className="text-5xl font-bold text-center mb-10">HTX Summarize app</h1>
        <p className='text-2xl'>Hi👋, I am Sammy! Give me some text or a file and I will summarize it for you!</p>

        <ChatInput text={textInput} file={file} onTextChange={setTextInput} onFileChange={setFile} onSubmit={onSubmit}></ChatInput>
        <Summary summary={summary}></Summary>
        <Nationalities nationalities={nationalities}></Nationalities>
      </div>
    </>
  )
}

export default App
