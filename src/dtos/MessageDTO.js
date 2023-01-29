export default class MessageDTO{
    constructor(message){
        this.id = message.id,
        this.email = message.email,
        this.message = message.msg,
        this.date = message.fyh
    }
}