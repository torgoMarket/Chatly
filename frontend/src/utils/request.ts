function toCamelCase(key: string): string {
	return key
		.replace(/ID$/g, 'Id') // Convert ending "ID" to "Id"
		.replace(/ID(?=[A-Z]|$)/g, 'Id') // Convert middle "ID" to "Id"
		.replace(/^[A-Z]/, match => match.toLowerCase())
}

export function keysToCamelCaseInObject(
	obj: Record<string, unknown>
): Record<string, unknown> {
	if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
		const newObj: Record<string, unknown> = {}
		for (const key in obj) {
			const value = obj[key]
			const camelCaseKey = toCamelCase(key)
			newObj[camelCaseKey] =
				typeof value === 'object' && value !== null
					? keysToCamelCaseInObject(value as Record<string, unknown>)
					: value
		}
		return newObj
	}
	return obj
}

export function keysToCamelCaseInObjectOfArray(
	arr: Record<string, unknown>[]
): Record<string, unknown>[] {
	if (Array.isArray(arr)) {
		return arr.map(item =>
			typeof item === 'object' && item !== null
				? keysToCamelCaseInObject(item)
				: item
		)
	}
	return arr
}
