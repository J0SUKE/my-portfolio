import Image from "next/image"
import styles from './Introduction.module.scss';

export default function Introduction() {
  return (
    <section className={styles.introduction}>
        <div className={styles.introduction__image}>
            <Image
                src={"/images/introBG.jpg"}
                priority
                layout="fill"
            />
        </div>
        <div className={styles.introduction__title}>
            <h1>
                <div>JEAN<span className={styles.copyright}>©</span></div>
                <div>MAZOUNI</div>
            </h1>
            <h1>
                <div>Développeur-WEB</div>
            </h1>
        </div>
    </section>
  )
}
