import { User } from './user';


export class Message {

    createdAt: Date;
    message: string;
    sender: User;
    


    constructor({createdAt, message, sender}){
        this.createdAt = createdAt;
        this.message = message;
        this.sender = new User(sender);

    }
    
    
}
