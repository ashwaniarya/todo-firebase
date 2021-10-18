import React from 'react'
import { Box } from 'ui-kit'
import styles from './todocomponents.module.css'

type TodoDateSeparatorProps = {
  text: string
}
export default function TodoDateSeparator({text}:TodoDateSeparatorProps) {
  return (
    <Box className={styles.dateSeparatorContainer}>
    <Box className={styles.dateSeparator}>
      <Box>{text}</Box>
    </Box>
    </Box>
  )
}
