import { createContext,ReactElement } from "react";
export interface IModalData {
  show?: boolean,
  content?: ReactElement<any>
}
export interface IContextObject{
  setModalData?: (arg0:IModalData)=>void
}

export const emptyObject: IContextObject = {}
export const GobalContext  = createContext<Partial<any>>(emptyObject);
 