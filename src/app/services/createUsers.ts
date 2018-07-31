import { Injectable } from '@angular/core';
import { User } from '../models/user';
@Injectable({ providedIn: 'root' })
export class CreateUsers {
  
  users:User[]=[];
 
  addToUseList(id:string, email: string,pw:string) {
    let user:User;
    user = new User(id,email,pw,'df','fg');
    this.users.push(user);
  }
 
}