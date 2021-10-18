import { NetworkRequest } from "../network";
import { BASE_URL, PATH } from "../api";
import { v4 as uuidv4 } from 'uuid';

const TodoService = {
  getTodo: function () {
    return NetworkRequest(
      "GET",
      BASE_URL,
      PATH.getTodos,
      null
    );
  },
  createTodo: function ({ task_name, task_description }) {
    const id = uuidv4();
    const createdAt = new Date().toISOString()
    return NetworkRequest(
      "POST",
      BASE_URL,
      PATH.createTodo,
      JSON.stringify({
        id,
        createdAt,
        task_name,
        task_description
      })
    );
  },
  updateTask: function ({ key,  task_name, task_description, createdAt, id, isDone }) {
    return NetworkRequest(
      "PATCH",
      BASE_URL,
      PATH.createTodo,
      JSON.stringify({ [key]: {
        id,
        createdAt,
        task_name,
        isDone,
        task_description
        }
      })
    );
  },
};

export default TodoService;
