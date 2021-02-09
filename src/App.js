import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import TodoList from './Todo/TodoList'
import Context from './context'
import Loader from './Loader'
import Modal from './Modal/Modal'
import ArticleList from './Article/ArticleList'
import Info from './Info/Info'
import Todo from './Todo/Todo'


function App() {
  // const [todos, setTodos] = React.useState([          //Используем деструктуризацию массива, аргумент UseState является начальным
  //   {id: 1, completed: false, title: 'Купить хлеб'},  //состоянием и предствляет из себя массив объектов todos
  //   {id: 2, completed: true, title: 'Купить масло'},  //Функция setTodos -- функция изменения с начального состояния на какое-то другое
  //   {id: 3, completed: false, title: 'Купить молоко'}
  // ])

  const AddTodo = React.lazy(()=>import('./Todo/AddTodo'))

  const [todos, setTodos] = React.useState([])


  const [loading, setLoading] = React.useState(true);
  

  //Попробуем получить список статей со своей базы данных
  const [articles, setArticles] = React.useState([]);
  const [todoLoading, setTodoLoading] = React.useState(true);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2000) //setTimeout
      })
    // fetch('http://api.akimgamm.ru/posts')
    //   .then(response => response.json())
    //   .then(articles => {
    //     setTimeout(() => {
    //       setArticles(articles)
    //       setTodoLoading(false)
    //     }, 10000) //setTimeout
    //   })
  },[])

  
  useEffect(()=>{
    fetch('http://api.akimgamm.ru/posts')
      .then(response => response.json())
      .then(articles => {
        setTimeout(() => {
          console.log(articles);
          setArticles(articles)
          setTodoLoading(false)
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

  function toggleArticle(id) {                   //Функция изменения атрибута checked у инпута чекбокса, через изменение галочки true/false
    setArticles(articles.map(article => {
      if(article.id === id) {
      
        article.completed = !article.completed

       }
    return article
    }))
  }


  function removeTodo(id) {                       //Функция отвечает за удаление определенного элемента списка Todo
    setTodos(todos.filter(todo=>todo.id !== id))
  }

  function removeArticle(id) {                       //Функция отвечает за удаление определенного элемента списка Todo
    setArticles(articles.filter(articles=>articles.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }


  return (//ReactSuspense для lazyloading                   //Value принимает в себя функции, позволяющие изменить начальное состояние UseState
    <BrowserRouter>
      <Context.Provider value={{ removeArticle, toggleArticle, removeTodo, toggleTodo }}>
      <Switch>
        <Route exact path='/Info' component={Info}/>
      </Switch> 
        <div className="wrapper">
          <h1>React tutorial</h1>
          <ul>
            <li><Link to='/Info'>Home</Link></li>
          </ul>
          <Modal />
          <React.Suspense fallback={<Loader />}>
            <AddTodo onCreate={addTodo} />
          </React.Suspense>

          {loading && <Loader />}

          
          {todos.length ? <TodoList todos={todos}/> : loading ? null : <div>Нет планов</div> }
        </div>
        <div className="wrapper">
          <h1>Статьи</h1>

          {todoLoading && <Loader />}
          {articles.length ? <ArticleList articles={articles}/> : todoLoading ? null : <div>Нет статей</div> /*endOfWrapper*/}
        </div> 
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;
