class ApiResponse extends Response{
    constructor(
        statusCode,
        message="Success",
        data=""
    ){
        super(message);
        this.statusCode=statusCode<400;
        this.message=message;
        this.data=data;
    }
}