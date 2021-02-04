import React, { useState } from 'react'

export default function AddTodo(props) {
  const [value, setValue] = useState('')

  function submitHandler(event) {
    event.preventDefault()
    if(value.trim()) { //Проверяем пустая ли функция
      setValue('')
      props.onCreate(value)
    }
  }

  function kek(event) {
    alert(value);
  }

  return (     //Функция submitHandler вызывается по отправке формы и отменяет действие по дефолту
    <form onSubmit={submitHandler}>
      <input value={value} onChange={event => setValue(event.target.value)}/>
      <button type="submit">Add Todo</button>
    </form>
    
  )
}

