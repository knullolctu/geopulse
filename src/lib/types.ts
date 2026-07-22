export type LoginPayload = { email: string; password: string }
export type LoginSuccess = { success: true; user: { id: string; email: string; name?: string; role: string } }
export type LoginFail = { success: false; message: string }
export type LoginResult = LoginSuccess | LoginFail
