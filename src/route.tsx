
import React, { ReactElement} from 'react'
import HomeScreen from '_home/HomeScreen'
// One stop place to all the gobal routes
interface IRoute {
    path: string,
    screen: ReactElement,
    name: string,
    exact?: boolean 

}
export const routes:IRoute[] = [
    {
        path: '/',
        screen: <HomeScreen/>,
        name:'Home'
    }
]
