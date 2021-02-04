import React, { useContext } from 'react'
import Context from '../context'

const styles = {
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:'.5rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '.5rem'
  },
  input: {
    marginRight: '1rem'
  }
}

export default function TodoItem(props) {
  const {removeTodo,toggleTodo} = useContext(Context) //Для того чтобы работать с функциями(контекстом), используем функцию useContext
  const classes = []  //removeTodo -- функции контекста, передаваемые из App

  if(props.todo.completed) {
    classes.push('done')
  }

  return(
    <li style={styles.li}>
      <span className={classes.join(' ')}>
        <input type='checkbox' checked={props.todo.completed} style={styles.input} onChange={()=>toggleTodo(props.todo.id)}></input>
        <strong>{props.index + 1}</strong>
          &nbsp;
          {props.todo.title}
      </span>

    <button className='rm' onClick={()=> removeTodo(props.todo.id)}>&times;</button>
    </li>
  )
}
