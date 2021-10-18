import React, { useState } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { Box, Text, IBoard, ITimer, ILogo } from 'ui-kit'
import styles from './HomeScreen.module.css'
import TodoList from '_todo/TodoList'
import { flattenStyle } from 'utils'
import MainContainer from './components/MainContainer'
import SideBar from './components/SideBar'
import { INavItems} from './types';


export default function HomeScreen() {
  const [showSideBar, setShowSideBar ] = useState(false);
  const { pathname } = useLocation();
  let sideBarContainerStyle = [styles.sideBar, styles.sideBarWidth]
  if(showSideBar) {
    sideBarContainerStyle.push(styles.sideBarActive);
  }
  
  const NAV_ITEMS:INavItems[] = [{
    to: '/',
    children: <><IBoard /><Text type={'p'} className={'margin-0'}>{'All Tasks'}</Text></>,
    className: styles.sideBarItem
  },{
    to: '/today',
    children:<><ITimer /><Text type={'p'} className={'margin-0'}>{'Today’s Tasks'}</Text></>,
    className: styles.sideBarItem
  }]
  const renderSideBarItems = ()=>{

    return NAV_ITEMS.map((item)=>{
      let isActive = item.to === pathname;
      let classNames = [item.className];
      if(isActive){
        classNames.push(styles.sideBarItemActive)
      }
      return  <SideBar.Item to={item.to} className={flattenStyle(classNames)}>{item.children}</SideBar.Item>
    })
  }

  return (
    <Box className={styles.rootContainer}>
      <SideBar.Container className={flattenStyle(sideBarContainerStyle)}>
        <SideBar.Header className={styles.sideBarHeader}>
          <Box className={styles.logoContainer}>
            <ILogo/>
          </Box>
        </SideBar.Header>
        <SideBar.Body className={styles.sideBarBody}>
          {renderSideBarItems()}
        </SideBar.Body>
      </SideBar.Container>
      <MainContainer className={styles.mainContainer} 
      onClick={(e:MouseEvent)=>{
        if(showSideBar) setShowSideBar(false);
      }}>
         <Switch>
          <Route path="/:filter">
            <TodoList onClickMenu={()=>{
        setShowSideBar(val=>!val);
      }}/>
          </Route>
          <Route path="/">
            <TodoList onClickMenu={()=>{
        setShowSideBar(val=>!val);
      }}/>
          </Route>
        </Switch>
      </MainContainer>
    </Box>
  )
}
