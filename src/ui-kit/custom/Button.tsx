import React,{ MouseEventHandler, ReactNode } from 'react'
import { flattenStyle } from 'utils';
import styles from './ui.module.css'

type Variant = {
  primary: string,
  rounded: string
}
const variant:Variant = {
  primary: styles.buttonPrimary,
  rounded: styles.buttonRounded
}

type Props = {
  type?: string
  onClick?: MouseEventHandler;
  text?: string;
  rounded?: boolean;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
}

const Button = ({ type = '', rounded, children, className = '', ...rest  }:Props) => {

    let extraClassName = ''; 
    
    extraClassName = extraClassName + rounded ? ' '+variant['rounded'] : '';
    const typeClassName = variant[type as keyof Variant] ? ` ${variant[type as keyof Variant]}`: ''
    extraClassName = extraClassName+typeClassName
    const classFromRoot = className ? ' ' + className : ''
    extraClassName = extraClassName + classFromRoot

    return <button className={flattenStyle([styles.button+extraClassName])} {...rest}>
        {children}
    </button>
}

export default Button