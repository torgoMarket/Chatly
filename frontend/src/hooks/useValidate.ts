export const useValidate = (userData: Record<string, string>) => {
	const error = Object.fromEntries(
		userData && Object.keys(userData).map(field => [field, ''])
	)

	for (const field in userData) {
		if (!userData[field]) {
			error[field] = 'This field is required'
		}
	}

	if (
		userData.password &&
		userData.repeatPassword &&
		userData.password !== userData.repeatPassword
	) {
		error.repeatPassword = 'Passwords do not match'
	}

	if (userData.email && !userData.email.includes('@')) {
		error.email = 'Invalid email'
	}

	if (userData.password && userData.password.length < 6) {
		error.password = 'Minimum 6 characters'
	}

	if (userData.name && userData.name.length < 4) {
		error.name = 'Minimum 4 characters'
	}

	return { error }
}
