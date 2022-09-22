import { useState } from 'react'
import Select from './Select'
function App() {
const options=[
  {label:"First",value:1},
  {label:"2nd",value:2},
  {label:"3rd",value:3},
  {label:"4th",value:4},
  {label:"5th",value:5}
  

]

const [value,setValue]=useState<typeof options[0] | undefined>(options[0])
  return (
    <div className="App">
    <Select options={options} value={value} onChange={o=>setValue(o)}/>
    </div>
  )
}

export default App
