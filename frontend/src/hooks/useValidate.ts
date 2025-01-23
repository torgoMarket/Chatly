export const useValidate = (userData: Record<string, string>) => {
	const { name, nickName, email, password, repeatPassword } = userData

	const error = Object.fromEntries(
		userData && Object.keys(userData).map(field => [field, ''])
	)

	for (const field in userData) {
		if (!userData[field]) {
			error[field] = 'This field is required'
		}
	}

	if (repeatPassword && password !== repeatPassword) {
		error.repeatPassword = 'Passwords do not match'
	}

	if (!email.includes('@')) {
		error.email = 'Invalid email'
	}

	if (password?.length < 6) {
		error.password = 'Minimum 6 characters'
	}

	if (name?.length < 4) {
		error.name = 'Minimum 4 characters'
	}

	if (nickName?.length < 4) {
		error.name = 'Minimum 4 characters'
	}

	return { error }
}
