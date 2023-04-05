export class UserInfo {
  static readonly type = '[Auth] Get user info from Google';

  constructor(token: string) {}
}

export class UserLogOut {
  static readonly type = '[Auth] Logout';

  constructor() {}
}
