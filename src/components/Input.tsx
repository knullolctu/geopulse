import React from 'react'
import { inputClass, inputStyle } from '../theme'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ className = '', style = {}, ...rest }: Props) {
  return <input className={`${inputClass} ${className}`} style={{ ...inputStyle, ...style }} {...rest} />
}
