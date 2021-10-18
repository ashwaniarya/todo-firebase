import React , { ReactNode, MouseEventHandler} from 'react'

type Props = {
    className?: string,
    children?: ReactNode,
    onClick?: MouseEventHandler,
    rest?: any 
  }

const Box = ({ children, className, ...rest  }:Props) => {
  
    return <div className={className} {...rest}>
        {children}
    </div>
}

export default Box