export interface IApiError {
    error: {
        code: number;
        developerMessage: string;
        message: string;
        statusCode: number;
    };
}