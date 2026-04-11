class ApiResponse extends Response{
    constructor(
        statusCode,
        data="",
        message="Success"
    ){
        super(message);
        this.statusCode=statusCode;
        this.message=message;
        this.data=data;
    }
}

export {ApiResponse};