import React, { MouseEventHandler } from 'react'
import styles from './ui.module.css'

type Props = {
  active: boolean,
  onClick: MouseEventHandler
}
export default function Checkbox({ active, onClick }:Props) {


  return (
    <label className={styles.checkbox}>
  <span className={styles.checkbox__input}>
    <input type="checkbox" name="checkbox" defaultChecked={active} onClick={onClick}/>
    <span className={styles.checkbox__control}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
        <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
    </span>
  </span>
</label>
  )
}

Checkbox.defaultProps = {
  active: false
}
