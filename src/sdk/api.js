const BASE_URLS = {
  production: 'https://todo-7117b-default-rtdb.firebaseio.com',
  development: 'https://todo-7117b-default-rtdb.firebaseio.com'
}

const BASE_URL = process.env.NODE_ENV === 'development'? BASE_URLS.development : BASE_URLS.production;

const PATH = {
    getTodos: '/tasks.json',
    createTodo: '/tasks.json'
}

export {
  BASE_URL,
  PATH
}