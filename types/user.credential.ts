export interface ICredentialUser {
    username: string
    email: string
    password: string
    confirmPassword: string
}

export interface IChangePassword {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}
