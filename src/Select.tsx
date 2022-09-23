import { useEffect, useState } from 'react'
import style from './select.module.css'
type SelectOptions = {
  label: String
  value: string | number
}
type MultipleSelectProps = {
  multiple: true
  value: SelectOptions[]
  onChange: (value: SelectOptions[]) => void


}

type SingleSelectProps = {
  multiple?: false
  value?: SelectOptions
  onChange: (value: SelectOptions | undefined) => void

}
type SelectProps = {
  options: SelectOptions[]


}
  & (SingleSelectProps | MultipleSelectProps)
const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  console.warn(value)
  const [isOpen, setIsOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(0)
  const selectOption = (option: SelectOptions) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(o => o !== option))
      }
      else {
        onChange([...value, option])

      }
    }
    else {
      if (option !== value) onChange(option)
    }
  }
  const isOptionSelected = (option: SelectOptions) => {
    return multiple ? value.includes(option) : option.label == value?.label

  }
  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined)
  }
  useEffect(() => {
    if (isOpen) setHighlightIndex(0)
  }, [isOpen]);
  return (
    <>
      <div tabIndex={0} className={style.container}
        onClick={() => setIsOpen(p => !p)}
        onBlur={() => setIsOpen(false)}>
        <span className={style.value}>{multiple ? value.map(v => (
          <button key={v.value} onClick={e => {
            e.stopPropagation()
            selectOption(v)
          }}
            className={style['option-badge']}
          >{v.label}
            <span className={style['remove-bnt']}>&times;</span>
          </button>
        )) : value?.label}</span>
        <button className={style['clear-btn']}
          onClick={clearOptions}>&times;</button>
        <div className={style.divider}></div>
        <div className={style.caret}>&#9660;</div>
        <ul className={`${style.options} ${isOpen ? style.show : ""}`}>
          {
            options.map((option, index) => (
              <li
                onMouseEnter={() => setHighlightIndex(index)}
                key={option.value} className={`${style.option} ${isOptionSelected(option) ? style.selected : ''} 
            ${index == highlightIndex ? style.highlighted : ''}`}


                onClick={(e) => {
                  e.stopPropagation()
                  selectOption(option)
                  setIsOpen(false)
                }}>
                {option.label}
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default Select