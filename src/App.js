import React, { useEffect } from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
import Loader from './Loader'
import Modal from './Modal/Modal'

function App() {
  // const [todos, setTodos] = React.useState([          //Используем деструктуризацию массива, аргумент UseState является начальным
  //   {id: 1, completed: false, title: 'Купить хлеб'},  //состоянием и предствляет из себя массив объектов todos
  //   {id: 2, completed: true, title: 'Купить масло'},  //Функция setTodos -- функция изменения с начального состояния на какое-то другое
  //   {id: 3, completed: false, title: 'Купить молоко'}
  // ])

  const AddTodo = React.lazy(()=>import('./Todo/AddTodo'))

  const [todos, setTodos] = React.useState([])


  const [loading, setLoading] = React.useState(true);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2000) //setTimeout
      })
  },[])

  //Попробуем получить список статей со своей базы данных
  const [artic, setArticles] = React.useState([]);
  useEffect(()=>{
    fetch('http://api.akimgamm.ru/posts')
      .then(response => response.json())
      .then(articles => {
        setTimeout(() => {
          alert(articles)
          console.log(artic,'before')
          setArticles(articles)
          console.log(artic,'after')

          setLoading(false)
        }, 2000) //setTimeout
      })
  },[])


  function toggleTodo(id) {                   //Функция изменения атрибута checked у инпута чекбокса, через изменение галочки true/false
    setTodos(todos.map(todo => {
      if(todo.id === id) {
      
        todo.completed = !todo.completed
      }
    return todo
    }))
  }


  function removeTodo(id) {                       //Функция отвечает за удаление определенного элемента списка Todo
    setTodos(todos.filter(todo=>todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }

  return (                                    //Value принимает в себя функции, позволяющие изменить начальное состояние UseState
    <Context.Provider value={{ removeTodo, toggleTodo }}> 


    <div className="wrapper">
      <h1>React tutorial</h1>
      <Modal />
      <React.Suspense fallback={<Loader />}>
        <AddTodo onCreate={addTodo} />
      </React.Suspense>

      {loading && <Loader />}
      {todos.length ? <TodoList todos={todos}/> : loading ? null : <div>Нет планов</div> }
      <h1>Статьи</h1>
      {/* {articles.length ? <ArticlesList articles={articles}/> : loading ? null : <div>Нет стратей</div> } */}
      {console.log(artic.length)}
    </div>
    </Context.Provider>
  );
}

export default App;
