import styles from './Home.module.scss';
import Header from '../Header/Header';

export default function Home() {
  return (
    <main className={styles.main}>
        <Header/>
    </main>
  )
}
