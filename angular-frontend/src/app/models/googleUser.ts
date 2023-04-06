export class GoogleUser {
  email: string;
  name: string;
  picture: string;

  constructor(email: string, name: string, picture: string) {
    this.email = email;
    this.name = name;
    this.picture = picture;
  }
}
