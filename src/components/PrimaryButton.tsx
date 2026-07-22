import React from 'react'
import { primaryButtonClass, primaryButtonStyle } from '../theme'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function PrimaryButton({ className = '', style = {}, children, ...rest }: Props) {
  return (
    <button className={`${primaryButtonClass} ${className}`} style={{ ...primaryButtonStyle, ...style }} {...rest}>
      {children}
    </button>
  )
}
