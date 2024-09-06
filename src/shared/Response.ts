

export interface ResponseResult<T> {
    isSuccess:boolean
    data?: T | T[];
}


export default ResponseResult