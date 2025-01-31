import styles from './ChatDate.module.scss'

const months = new Map([
	['0', 'January'],
	['1', 'February'],
	['2', 'March'],
	['3', 'April'],
	['4', 'May'],
	['5', 'June'],
	['6', 'July'],
	['7', 'August'],
	['8', 'September'],
	['9', 'October'],
	['10', 'November'],
	['11', 'December'],
])

export const ChatDate = ({ viewDate }: { viewDate: Date }) => {
	console.log('viewDate', viewDate)
	return (
		<div className={styles.date}>
			{viewDate.getDate()} {months.get(String(viewDate.getMonth()))}
		</div>
	)
}
