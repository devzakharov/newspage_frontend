import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  user: string;

  log = (msg: string) => {
    console.log(msg);
  }

  getUser(): string {
    return this.user;
  }
}
