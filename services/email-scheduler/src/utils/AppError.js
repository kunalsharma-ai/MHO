export class AppError extends Error{
    #status;
    constructor(message,status=500){
        super(message);
        this.#status=status;
        Error.captureStackTrace(this,this.constructor)
    }
    get status(){
        return this.#status;
    }
}