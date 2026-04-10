class ApiResponse extends Response{
    constructor(
        statusCode,
        message="Success",
        data=""
    ){
        super(message);
        this.statusCode=statusCode;
        this.message=message;
        this.data=data;
    }
}

export {ApiResponse};