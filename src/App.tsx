import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


function App() {

  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  

  return (
    <>
      <h1>HTX Summarize app</h1>
      <div className='inputForm'>
        <label htmlFor="inputFile">Upload a file (.docx or .txt format) </label>
        <Input type='file' id='inputFile' name='inputFile' onChange={(e) => setSelectedFile(e.target.files)}/>

        <Input type='text' id='inputText' name='inputText' onChange={(e) => {
          setTextInput(e.target.value)
          }}/>
          <Button type='submit' onClick={
            () => {
              setTextInput('')
            }
          }>Submit</Button>
      </div>
    </>
  )
}

export default App
