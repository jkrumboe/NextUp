export interface UserPayload {
  sub: string;
  email: string;
  username: string;
}

export interface RequestWithUser extends Request {
  user: UserPayload;
}
