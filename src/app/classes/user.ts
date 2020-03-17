export class User {

    admin: boolean;
    firstName: string;
    lastName: string;
    photoUrl: string;

    constructor({admin, firstName, lastName, photoUrl}){
        this.admin = admin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photoUrl = photoUrl;
    }
}
