import React from 'react'
import styles from './Actionbar.module.scss'
export const Actionbar = ({ children }: { children: React.ReactNode }) => {
	return <div className={styles.actionbar}>{children}</div>
}
