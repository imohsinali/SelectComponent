import { useState } from 'react'
import Select, { SelectOptions } from './Select'
function App() {
  const options = [
    { label: "First", value: 1 },
    { label: "2nd", value: 2 },
    { label: "3rd", value: 3 },
    { label: "4th", value: 4 },
    { label: "5th", value: 5 }


  ]

  const [value1, setValue1] = useState<SelectOptions[]>([options[0]])
  const [value2, setValue2] = useState<SelectOptions | undefined>(options[0])

  return (
    <div className="App">
      <Select multiple options={options} value={value1} onChange={o => setValue1(o)} />
      <br />
      <Select options={options} value={value2} onChange={o => setValue2(o)} />

    </div>
  )
}

export default App
