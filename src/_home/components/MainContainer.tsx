import React from 'react'
import { Box } from 'ui-kit'
import { PropsWithChidrenAndRest } from '../types'

export default function MainContainer({ children, ...rest }:PropsWithChidrenAndRest) {
  return (
    <Box {...rest}>
      {children}
    </Box>
  )
}