import React, { useState } from "react";
import { TodoService } from "sdk";
import { Box, Text, Button } from "ui-kit";
import { flattenStyle } from "utils";
import styles from "./todo.module.css";

const MAX_DESCRIPTION_CHAR = 250;
const MIN_DESCRIPTION_CHAR = 50;

export default function TodoCreate({ onCreateCallback = () => {} }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDescriptionError, setTaskDescriptionError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const isSubmitDisabled = !taskName || !taskDescription;

  const onChangeTaskNameHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9_\s]*$/
    if(regex.test(e.target.value)){
      setTaskName(e.target.value);
    }
  };

  const onChangeTaskDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const regex = /^[a-zA-Z0-9_\s]*$/
    if(regex.test(e.target.value)){
      setTaskDescription(e.target.value);
    }
    setTaskDescriptionError(null)
  };


  const submitTask = async ()=>{
    const newTodo = {
      task_name: taskName,
      task_description: taskDescription,
    };

    try {
      setTaskName('');
      setTaskDescriptionError('');
      setLoading(true);
      await TodoService.createTodo(newTodo);
      onCreateCallback();
    } catch (error) {}
  }
  const validate = () => {
    if (isSubmitDisabled) return false;

    if(taskDescription.length < MIN_DESCRIPTION_CHAR || taskDescription.length > MAX_DESCRIPTION_CHAR){
      setTaskDescriptionError(`Description should be more than ${MIN_DESCRIPTION_CHAR} and less than ${MAX_DESCRIPTION_CHAR} characters`);
      return false;
    }
    return true
  }

  const onAddTaskHandler = () => {
    if(validate()){
      submitTask()
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Box className={styles.todoCreateContainer}>
      <Box className={styles.todoCreateHeader}>
        <Text
          type={"p"}
          className={flattenStyle(["margin-0", styles.todoCreateHeaderText])}
        >
          Add New Task
        </Text>
      </Box>
      {!!loading && <Box className={styles.todoCreateBody}><Text type={'h4'} className={flattenStyle(['margin-0',styles.animateText])}>Creating todo ...</Text></Box>}
      {!loading &&  <form onSubmit={onSubmit} className={styles.todoCreateBody}>
        <Box className={styles.inputControl}>
          <label htmlFor="task-name">Task Name</label>
          <input
            className={styles.todoCreateInput}
            placeholder="Enter task name"
            name="task-name"
            onChange={onChangeTaskNameHandler}
            value={taskName}
          />
        </Box>
        <Box className={styles.inputControl}>
          <label htmlFor="task-description">Task Description</label>
          <textarea
            maxLength={MAX_DESCRIPTION_CHAR}
            placeholder="Enter Task description here"
            className={styles.todoCreateInput}
            name="task-description"
            onChange={onChangeTaskDescription}
            value={taskDescription}
            rows={8}
          />
          {!!taskDescriptionError && <Box>
            <Text
              type={"p"}
              className={flattenStyle([
                "margin-0",
                styles.inputBottomLabel,
                styles.inputLabelWarning,
              ])}
            >
              {taskDescriptionError}
            </Text>
          </Box>}
          <Box>
            <Text
              type={"p"}
              className={flattenStyle([
                "margin-0",
                styles.inputBottomLabel,
                styles.inputLabelInfo,
              ])}
            >
              Max character {MAX_DESCRIPTION_CHAR}
            </Text>
          </Box>
        </Box>
       <Box className={styles.submitBtnContaier}>
          <Button
            disabled={isSubmitDisabled}
            rounded
            type={"primary"}
            onClick={onAddTaskHandler}
          >
            Add&nbsp;Task
          </Button>
        </Box>
      </form>}
    </Box>
  );
}
