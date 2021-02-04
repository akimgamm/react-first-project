import React from 'react'
import TodoItem from './TodoItem'
import PropTypes from 'prop-types'

const styles = {
  ul: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  }
}

export default function TodoList(props) {
  return(
    <ul style={styles.ul}>
      {props.todos.map((todo, index) => { //Берем из пропсов объект todos, где todo -- элемент todos
        // console.log(props);
        // console.log(todo);
        return <TodoItem  todo={todo} key={todo.id} index={index} onChange={props.onToggle}/>
      })}
    </ul>
  )
}