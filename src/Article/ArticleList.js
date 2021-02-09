import React from 'react'
import ArticleItem from './ArticleItem'
import PropTypes from 'prop-types'


// const styles = {
//   ul: {
//     listStyle: 'none',
//     margin: 0,
//     padding: 0
//   }
// }

export default function ArticleList(props) {
  return(
    <ul>
      {props.articles.map((article, index) => { //Берем из пропсов объект todos, где todo -- элемент todos
        // console.log(props);
        if(article.completed === '1' || article.completed === 'true'){
          article.completed = true
        } else if(article.completed === '0' || article.completed === 'false') {
          article.completed = false
        }
        return <ArticleItem  article={article} key={article.id} index={index}/>
      })}
    </ul>
  )
}