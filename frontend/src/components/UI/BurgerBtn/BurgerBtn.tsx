import { AlignJustify, X } from 'lucide-react'
import styles from './BurgerBtn.module.scss'

interface BurgerBtnProps {
	isOpen: boolean
	toggleSidebar: () => void
}

export const BurgerBtn: React.FC<BurgerBtnProps> = ({
	isOpen,
	toggleSidebar,
}) => {
	return isOpen ? (
		<X className={styles.burgerBtn} onClick={toggleSidebar} />
	) : (
		<AlignJustify className={styles.burgerBtn} onClick={toggleSidebar} />
	)
}
