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

export default function ArticleItem(props) {
  const {removeTodo,toggleTodo} = useContext(Context) //Для того чтобы работать с функциями(контекстом), используем функцию useContext
  const classes = []  //removeTodo -- функции контекста, передаваемые из App

  if(props.article.completed) {
    classes.push('done')
  }

  return(
    <li style={styles.li}>
      <span className={classes.join(' ')}>
        <input type='checkbox' checked={props.article.completed} style={styles.input} onChange={()=>toggleTodo(props.article.id)}></input>
        <strong>{props.index + 1}</strong>
          &nbsp;
          {props.article.title}
      </span>

    <button className='rm' onClick={()=> removeTodo(props.todo.id)}>&times;</button>
    </li>
  )
}
