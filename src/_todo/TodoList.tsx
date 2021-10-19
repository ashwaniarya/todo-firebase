import React, { useState, useContext, useEffect } from "react";
import { GobalContext, IContextObject } from "store";
import { Box, Text, Button, INoTodoIllustration, IHamburgur, ILoader } from "ui-kit";

import { useParams } from "react-router-dom";
import TodoSearchInput from "./components/TodoSearchInput";

import styles from "./todo.module.css";
import TodoDateSeparator from "./components/TodoDateSeparator";
import Todo from "./components/Todo";
import TodoCreate from "./TodoCreate";
import { TodoService, useNetworkRequest } from "sdk";
import { flattenStyle, useMaxWidth } from "utils";
import { ITodo, ITodoWithDateObject, IDateObject  } from "./types"
export const emptyObject:IContextObject = {}

const todayDate = new Date().setHours(0, 0, 0, 0);
const yesterdayDate = new Date().setHours(-24, 0, 0, 0);
const FILTERS = {
  ALL: "all",
  TODAY: "today",
};



function getSortedTodo(data: ITodo[], filter:string) {
  let formattedTodo = data.reduce((acc, item) => {
    const createdAt = new Date(item?.createdAt);
    const date = createdAt.getDate();
    const month = createdAt.getMonth();
    const formatedCreatedAt = new Date(createdAt);

    formatedCreatedAt.setHours(0, 0, 0, 0);
    const dateObject:IDateObject = { date, month };
    const newItem:ITodoWithDateObject = {
      dateObject,
      id: item?.id,
      createdAt: item?.createdAt,
      task_name: item?.task_name,
      isDone: item?.isDone,
      task_description: item?.task_description
    };

    if (filter === FILTERS.TODAY) {
      if (formatedCreatedAt.getTime() !== todayDate) {
        return acc;
      }
    }
    const isoString = formatedCreatedAt.toISOString();
    const valueInAcc = acc.get(isoString);

    if (valueInAcc) {
      valueInAcc.push(newItem);
      acc.set(
        isoString,
        valueInAcc.sort((a:ITodoWithDateObject, b:ITodoWithDateObject) => {
          return a?.dateObject.date > b?.dateObject.date ? 1 : -1;
        })
      );
    } else {
      acc.set(isoString, [newItem]);
    }

    return acc;
  }, new Map<string,ITodoWithDateObject[]>());

  let arrayToStort = [...formattedTodo.entries()];

  let sortedTodo = new Map<string,ITodoWithDateObject[]>(
    arrayToStort.sort((a:[string,ITodoWithDateObject[]], b:[string,ITodoWithDateObject[]]) => {
      return new Date(a[0]).getTime() > new Date(b[0]).getTime() ? -1 : 1;
    })
  );

  return sortedTodo;
}

function applySearchFilter(data: ITodo[], searchQuery:string) {
  if (!searchQuery) return data;
  const regex = new RegExp(".*" + searchQuery + ".*", "g");
  return data.filter((todo) => {
    return regex.test(todo?.task_name);
  });
}

type TodoListProps = {
  onClickMenu: ()=>void
}
type Params = {
  filter: string
}
export default function TodoList({ onClickMenu }:TodoListProps) {
  const { filter } = useParams<Params>();
  const [searchQuery, setSearchQuery] = useState("");

  let { fetching, data, refetch } = useNetworkRequest(TodoService.getTodo);
  let serverKeys = Object.keys(data);
  let rowTodoArray =
    Object.values<ITodo>(data).map<ITodo>((item:ITodo, index) => {
      item.serverKey = serverKeys[index];
      return item;
    }) || [];

  const isPassed = useMaxWidth(840);

  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    refetch();
  }, [filter]);

  const updateTodo = async (todo: ITodo, isDone: boolean) => {
    let todoToUpdate = {
      key: todo.serverKey,
      task_name: todo.task_name,
      task_description: todo.task_description,
      createdAt: todo.createdAt,
      id: todo.id,
      isDone: !isDone,
    };
    await TodoService.updateTask(todoToUpdate);
    refetch(undefined, 'passive');
  };

  const renderTodoNotAvailable = (message1:string, message2:string)=>{
    return <Box className={styles.center}>
          <INoTodoIllustration />
          <Box className={styles.noTodoTextContainer}>
            <Text
              type="p"
              className={flattenStyle(["margin-0", styles.noTodoText])}
            >
              {message1}
            </Text>
            <Text
              type="p"
              className={flattenStyle(["margin-0", styles.noTodoText])}
            >
              {message2}
            </Text>
          </Box>
          <Button rounded type={"primary"} onClick={onClickAddTaskHandler}>
            Add&nbsp;Task
          </Button>
        </Box>
  }

  const renderTodos = () => {
    if (!fetching) {
      const filteredTodo = applySearchFilter(rowTodoArray, searchQuery);

      if (!!searchQuery && filteredTodo.length === 0) {
        return <Box>Try using different search input</Box>;
      }
      const sortedTodo = getSortedTodo(filteredTodo, filter);
      if(sortedTodo.size === 0 && filteredTodo.length > 0){
        return <Box className={styles.marginTop}>{renderTodoNotAvailable("You don't have any todo today", 'Create your tasks by clicking on Add tasks')}</Box>
      }
      const content = [];
      for (var [key, value] of sortedTodo) {
        const date = new Date(key);
        const isToday = todayDate === new Date(date).setHours(0, 0, 0, 0);
        const isYesterday = yesterdayDate === new Date(date).setHours(0, 0, 0, 0);

        const dateToShow = isYesterday? 'Yesterday':isToday
          ? "Today"
          : date.toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            });
        content.push(
          <Box key={key} className={styles.todoSection}>
            <TodoDateSeparator text={dateToShow} />
            {value.map((todo) => {
              return (
                <Todo
                  key={todo.serverKey}
                  onClickDone={() => updateTodo(todo,!!todo?.isDone)}
                  isDone={!!todo?.isDone}
                  taskName={todo.task_name}
                  taskDescription={todo.task_description}
                  className={styles.todoItem}
                />
              );
            })}
          </Box>
        );
      }
      return content;
    } else {
      return null;
    }
  };

  const noTodos = !!(rowTodoArray.length === 0);
  const appContext = useContext(GobalContext) || emptyObject;
  const onClickAddTaskHandler = () => {
    if(!!appContext) { appContext.setModalData({
      show: true,
      content: (
        <TodoCreate
          onCreateCallback={() => {
            refetch();
            appContext.setModalData({ show: false, context: null });
          }}
        />
      ),
    })}
  };

  const mainContainerStyle = [styles.todoContainer];
  if (noTodos && !fetching) {
    mainContainerStyle.push(styles.center);
  }
  return (
    <Box className={flattenStyle(mainContainerStyle)}>
      {fetching && <Box className={styles.loader}><ILoader /></Box>}
      {!noTodos && !fetching && (
        <>
          <Box className={styles.todoActionContainer}>
          { !isPassed && <Box>
           <Button className={flattenStyle([styles.hamburgurButton, 'side-bar-menu'])} onClick={(e) => {
                onClickMenu();
              } } ><IHamburgur/></Button>
          </Box>}
            <TodoSearchInput
              placeholder="Search for Tasks here"
              value={searchQuery}
              onChange={onChangeHandler}
            />
            <Button
              rounded
              type={"primary"}
              className={styles.addTaskButton}
              onClick={onClickAddTaskHandler}
            >
              {isPassed ? `Add${"\u00A0"}Task` : "+"}
            </Button>
          </Box>
          {renderTodos()}
        </>
      )}
      {noTodos && !fetching && (
        renderTodoNotAvailable('A good place to keep track of your day to day tasks','Create your tasks by clicking on Add tasks')
      )}
    </Box>
  );
}
