import { Link } from 'react-router-dom'
import homePhoto from '../../assets/images/homeImage.png'
import styles from './Home.module.scss'
export const Home = () => {
	return (
		<div className={styles.home}>
			<div className={styles.info}>
				<h2>
					Your Voice <br /> Your Community
				</h2>
				<p>
					<span className={styles.firstWord}>Chatly</span> is a sleek app for
					seamless chatting and voice calls. Connect effortlessly with loved
					ones or new friends worldwide. Experience clear, personal, and
					meaningful communication anytime.
				</p>
				<Link className={styles.link} to='/login'>
					Start Messaging
				</Link>
			</div>
			<div className={styles.image}>
				<img src={homePhoto} alt='Home Photo' />
			</div>
		</div>
	)
}
