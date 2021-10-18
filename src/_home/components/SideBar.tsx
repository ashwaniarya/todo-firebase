import React from 'react';
import { PropsWithChidrenAndRest, ItemProps } from '../types';
import { Link } from 'react-router-dom'

import { Box } from 'ui-kit'


function Container({children, ...rest}:PropsWithChidrenAndRest) {
  return (
    <Box {...rest}>
      {children}
    </Box>
  )
}

function Header({children,...rest}:PropsWithChidrenAndRest){
  return <Box {...rest}>{children}</Box>
}

function Body({children,...rest}:PropsWithChidrenAndRest){
  return <Box {...rest}>{children}</Box>
}
function Item({to ,children, ...rest }:ItemProps){
  return (<Link to={to} {...rest}>{children}</Link>)
}

const SideBar = {
  Container,
  Header,
  Item,
  Body
}
// Side bar compoent
export default SideBar
