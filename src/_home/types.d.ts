import { ReactNode } from 'react'
export type PropsWithChidrenAndRest = {
  children?: ReactNode
  [rest:string]: any;
}

export type ItemProps = {
  children?: ReactNode
  to: string,
  [rest:string]: any;
}

export interface INavItems {
  to: string,
  children: ReactNode,
  className: string
}