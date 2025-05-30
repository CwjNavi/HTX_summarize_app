import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputFileDisplay } from './components/InputFileDisplay'
import { ChatInput } from './components/ChatInput'
import mammoth from 'mammoth'
import { send } from './services/summarize'

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

  const onSubmit = async () => {
    alert('submitting!')
    console.log(textInput)
    console.log(file)
    const html = await convertDocxToHtml(file)
    setCurrentQuery(textInput.concat(html))

    try {
      const response = await send({ text: currentQuery })
      console.log(response.message)
    } catch (err) {
      console.error('Failed to send data', err)
    }

    setTextInput('')
    setFile(null)
  }

  return (
    <>
      <div className='content-center'>
        <h1 className="text-5xl font-bold text-center">HTX Summarize app</h1>
        <p className='text-2xl'>Hi👋, I am Sammy! Give me some text or a file and I will tell you all about it!</p>

        <ChatInput text={textInput} file={file} onTextChange={setTextInput} onFileChange={setFile} onSubmit={onSubmit}></ChatInput>

        <InputFileDisplay html={currentQuery}></InputFileDisplay>
      </div>
    </>
  )
}

export default App
