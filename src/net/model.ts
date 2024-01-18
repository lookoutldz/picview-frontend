
// 通用后台返回体
type CommonResponse = {
    statusCode: number;
    statusMessage: string;
    data: any
};

function isCommonResponse(obj: any): obj is CommonResponse {
    return typeof obj === 'object' && obj !== null && 'statusCode' in obj && 'statusMessage' in obj && 'data' in obj;
}

// 定义 Get 请求函数参数的类型
type GetParams<T> = {
    url: string;
    params?: Record<string, any>;
    success: (response: T) => void;
    failure?: (message: string) => void;
    error?: (error: any) => void;
};

// 定义 Post 请求函数参数的类型
type PostParams<T> = {
    url: string;
    body?: any;
    content_type?: string;
    success: (response: T) => void;
    failure?: (message: string) => void;
    error?: (error: any) => void;
};

export type {CommonResponse, GetParams, PostParams}
export {isCommonResponse}