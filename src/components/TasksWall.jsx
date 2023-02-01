import { useState } from 'react'
import { Task } from './Task'
import styles from './TasksWall.module.css'
import * as uuid from 'uuid'
import { PencilLine } from 'phosphor-react';

export function TasksWall() {

  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('')
  const [isTaskCompleted, setIsTaskCompleted] = useState(false)

  const completedTasks = tasks.length >= 0 ? (tasks.filter(task => task.isCompleted === true).length) : 0

  function handleCreateNewTask() {
    event.preventDefault();

    setTasks( [...tasks, {
      id: uuid.v4(),
      title: newTaskText,
      isCompleted: setIsTaskCompleted(false),
    }])
    setNewTaskText('')
  }

  function handleNewTaskChange() {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  function handleNewTaskInvalid() {
    event.target.setCustomValidity('You need to provide a new task')
  }

  function deleteTask(taskToDelete) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete;
    })
    setTasks(tasksWithoutDeletedOne);
  }

  function toggleCompleted(taskToComplete){

    const findTaskToComplete = tasks.find(task => {
      return task.id == taskToComplete;
    })

    if(findTaskToComplete.isCompleted)
    {findTaskToComplete.isCompleted = false} 
    else {findTaskToComplete.isCompleted = true}
    
    setIsTaskCompleted(findTaskToComplete.isCompleted)
  }

  return (
    <article className={styles.tasks}>
        <form 
          onSubmit={handleCreateNewTask}
        >
          <textarea 
            name="taskTitle" 
            placeholder="Add a task to your list..."
            onChange={handleNewTaskChange}
            value={newTaskText}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <input type="submit" value="CREATE NEW TASK"/>
        </form>

        <section className={styles.tasksWall}>
          <div className={styles.info}>
            <div>
              <h3>Tasks created</h3>
              <strong>{tasks.length}</strong>
            </div>
            <div>
              <h3>Tasks finished</h3>
              <strong>{completedTasks}</strong>
            </div>
          </div>

          <div  className={styles.tasksList}>
            {tasks.length > 0 ?
              tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    id={task.id}
                    content={task.title}
                    isCompleted={task.isCompleted}
                    publishedAt={new Date()}
                    onDeleteTask={deleteTask}
                    onToggleCompleted={toggleCompleted}
                  />
              )}) :
                (<div className={styles.noTask}>
                  <PencilLine size={64} weight="light"/>
                  <strong>You don't have any tasks registered yet</strong>
                  <p>Create new tasks and organize your tasks wall</p>
                </div>)
                }
          </div>
        </section>
      </article>
  )
}