import { format, formatDistanceToNow } from 'date-fns'
import ptBR from  'date-fns/locale/pt-BR'

import {CheckCircle, Circle, Trash} from 'phosphor-react'
import styles from './Task.module.css'

export function Task({ content, publishedAt, isCompleted, onDeleteTask, onToggleCompleted, id }) {

  function handleDeleteTask() {
    onDeleteTask(id)
  }

  function handleToggleCompleted() {
    onToggleCompleted(id)
  }

  const publishedDateFormat = format(publishedAt, "d LLL 'às' HH:mm'h'", {
    locale: ptBR,
  })

	const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    addSuffix: true,
	})

  return (
    <div className={styles.wrapper}>
        {isCompleted ? 
          (<div title="Toggle task" className={styles.content} onClick={handleToggleCompleted}>
            <CheckCircle size={24} weight="bold" className={styles.taskCompleted} />
            <p className={styles.taskCompleted} >{content}</p>
          </div>)
          :
          (<div className={styles.content} onClick={handleToggleCompleted}>
            <Circle size={24} weight="bold"className={styles.taskNotCompleted} />
            <p className={styles.taskNotCompleted}>{content}</p>
          </div>)
        }
      
      <div className={styles.info}>
        <time title={publishedDateFormat} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
        <button title="Delete task" onClick={handleDeleteTask}>
          <Trash size={20} />
        </button>
      </div>

    </div>
  )
}