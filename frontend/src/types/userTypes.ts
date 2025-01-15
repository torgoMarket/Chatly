export type TUser = {
	id: number
	name: string
	email: string
	password: string
	tag: string
	device_hear: string
	device_voice: string
	isActivated: boolean
	color: string
}

export type TUserRegister = Pick<TUser, 'name' | 'email' | 'password'> & {
	repeatPassword?: string
}
export type TUserLogin = Pick<TUser, 'email' | 'password'>
