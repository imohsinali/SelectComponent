import { useEffect, useState } from 'react'
import style from './select.module.css'
type SelectOptions={
    label:String
    value:string|number
}

type SelectProps={
    options:SelectOptions[]
    value?:SelectOptions
    onChange:(value:SelectOptions | undefined)=>void

}
const Select = ({value,onChange,options}:SelectProps) => {
  console.warn(value)
  const [isOpen,setIsOpen]=useState(false)
  const [highlightIndex,setHighlightIndex]=useState(0)
  const selectOption=(option:SelectOptions)=>{

   if(option!==value)  onChange(option)

  }
  const isOptionSelected=(option:SelectOptions)=>{
    return option.label==value?.label

  }
  useEffect(() => {
    if(isOpen) setHighlightIndex(0)
  }, [isOpen]);
  return (
    <>
    <div tabIndex={0} className={style.container} 
    onClick={()=>setIsOpen(p=>!p)}
    onBlur={()=>setIsOpen(false)}>
      <span className={style.value}>{value?.label}</span>
      <button className={style['clear-btn']}
      onClick={(e)=>{onChange(undefined)
        e.stopPropagation()}  }>&times;</button
      >
      <div className={style.divider}></div>
      <div className={style.caret}>&#9660;</div>
      <ul className={`${style.options} ${ isOpen?style.show:""}`}>
        {
          options.map((option,index)=>(
            <li
            onMouseEnter={()=>setHighlightIndex(index)}
            key={option.value} className={`${style.option} ${isOptionSelected(option)?style.selected:''} 
            ${index==highlightIndex?style.highlighted:''}`}
            

            onClick={(e)=>{e.stopPropagation()
            selectOption(option)
            setIsOpen(false)}}>
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