import { format } from 'date-fns';
import styles from './Header.module.css';

const today = new Date();

export function Header() {
  const todayDateFormat = format(today, "EEEE d MMM '/' y")

  return (
    <div className={styles.header}>
      <h1 className={styles.title}><strong>_tasks</strong>wall</h1>
      <h2 className={styles.date}>{todayDateFormat}<strong>.</strong></h2>
    </div>
  )
}