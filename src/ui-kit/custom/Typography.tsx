import React, { ReactNode } from 'react'
interface ITypographyProps {
    type: string,
    className?: string,
    children?: ReactNode
}

const Typography = ({ type, className, children, ...rest}:ITypographyProps) => {    
    const CustomTag = `${type}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
    return <CustomTag children={children} className={className} {...rest}></CustomTag>
}

export default Typography