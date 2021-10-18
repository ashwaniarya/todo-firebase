import React, { useState } from 'react'
import { Checkbox, Box, Text } from 'ui-kit'
import { flattenStyle } from 'utils'
import styles from './todocomponents.module.css'

type TodoProps = {
  className?: string;
  taskName: string;
  taskDescription: string;
  isDone?: boolean;
  onClickDone: ()=>void;
}

export default function Todo({ className, taskName, taskDescription, isDone , onClickDone = () => {}}:TodoProps) {
  const [ active, setActive ] = useState(false);
  const [ initalDone, setInitialDone ] = useState(isDone)
  const onClickTodoHandler = () => {
    setActive(!active);
  }

  const onClickCheckboc = () => {
    setInitialDone(val=>!val);
    onClickDone();
  }

  let todoStyle = [styles.todo, styles.todoInactive]
  if(className){
    todoStyle.push(className);
  }
  let todoTaskNameStyle = ['margin-0'];
  let todoTaskDescriptionStyle = ['margin-0',styles.todoMainDescriptionInActive];
  if(active){
    todoStyle.push(styles.todoActive);
    todoTaskNameStyle.push(styles.todoMainActive);
    todoTaskDescriptionStyle.push(styles.todoMainDescriptionActive);
  }

  if(initalDone){
    todoStyle.push(styles.todoDone);
  }

  return (
    <Box onClick={onClickTodoHandler} className={flattenStyle(todoStyle)}>
      <Checkbox active={initalDone} onClick={onClickCheckboc}/>
      <Box className={styles.todoMain}>
        <Text type={'p'} className={flattenStyle(todoTaskNameStyle)}>{taskName}</Text>
        <Text type={'p'} className={flattenStyle(todoTaskDescriptionStyle)}>{taskDescription}</Text>
      </Box>
    </Box>
  )
}

Todo.defaultProps = {
  active : false 
}
