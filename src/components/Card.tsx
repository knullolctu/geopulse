import React from 'react'
import { cardClass, cardStyle } from '../theme'

type Props = React.HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements
}

export default function Card({ as: Component = 'section', children, className = '', style = {}, ...rest }: Props) {
  return (
    // @ts-ignore allow dynamic component
    <Component 
      className={`${cardClass} ${className}`} 
      style={{ ...cardStyle, ...style }} 
      {...rest}
    >
      {children}
    </Component>
  )
}
