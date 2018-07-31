export class User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    constructor(id: string,username: string,password: string,firstName: string, lastName: string){
        this.id=id;
        this.username=username;
        this.password=password;
        this.firstName=firstName;
        this.lastName=lastName;
    }
}
