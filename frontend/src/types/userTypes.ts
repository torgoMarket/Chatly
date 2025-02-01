export type TUser = {
	id: number
	name: string
	nickName: string
	email: string
	tag: string
	device_hear: string
	device_voice: string
	isActivated: boolean
	color: string
}

export type TUserRegister = Pick<TUser, 'name' | 'email' | 'nickName'> & {
	password: string
	repeatPassword: string
}
export type TUserLogin = Pick<TUser, 'email'> & {
	password: string
}

export type TUserRecover = Pick<TUser, 'email'> & {
	newPassword: string
	code: number
}
