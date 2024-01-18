import type {AxiosResponse} from "axios";
import axios from "axios";
import {ElMessage} from "element-plus";
import type {GetParams, PostParams} from "@/net/model";
import {isCommonResponse} from "@/net/model";

// 公用请求器
const requester = axios.create({
    baseURL: "/api",
    timeout: 60000
});

// 请求拦截器，用于在请求发送前进行处理
requester.interceptors.request.use(
    (config) => {
        // console.log("interceptors.request");
        // console.log(config);
        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

// 响应拦截器，用于在收到响应后进行处理
requester.interceptors.response.use(
    (response) => {
        // console.log("interceptors.response");
        // console.log(response);
        return response;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

// 通用错误处理器
const defaultError = (error: any) => {
    console.log(error);
    ElMessage.error("发生了一些错误，请联系站长！");
}
const defaultFailure = (message: string) => {
    ElMessage.warning(message);
}

// get
function get<T>({url, params, success, failure = defaultFailure, error = defaultError}: GetParams<T>) {
    requester.get<T>(url, {
        params: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(response => {
        // 校验 HTTP 状态码
        if (response.status === 200) {
            commonResponsePreHandler(response, success);
        } else {
            failure("请求异常, HTTP: " + response.status);
        }
    }).catch(error)
}

function getResource(url: string, success: (imgUrl: string) => void, failure = defaultFailure): void {
    requester.get(url, {
        responseType: 'arraybuffer'
    }).then(response => {
        // 校验 HTTP 状态码
        if (response.status === 200) {
            // 将二进制数组转为Blob对象
            const blob = new Blob([response.data], { type: 'image/jpeg' });
            // 创建一个临时URL，用于显示图片
            let imgUrl = window.URL.createObjectURL(blob)
            success(imgUrl)
        } else {
            failure("请求异常, HTTP: " + response.status);
        }
    })
}

// post
function post<T>({ url, body, content_type, success, failure = defaultFailure, error = defaultError }: PostParams<T>): void {
    requester.post<T>(url, body, {
        headers: {
            'Content-Type': content_type,
        }
    }).then(response => {
        // 校验 HTTP 状态码
        if (response.status === 200) {
            commonResponsePreHandler(response, success);
        } else {
            failure(`请求异常, HTTP: ${response.status}`);
        }
    }).catch(error);
}

// 通用 CommonResponse 预处理器
function commonResponsePreHandler<T>(response: AxiosResponse<T>, handle: (data: T) => void) {
    if (isCommonResponse(response.data)) {
        // 校验业务状态码
        if (response.data.statusCode === 200) {
            handle(response.data);
        } else {
            let message = `${response.data.statusCode} - ${response.data.statusMessage}`;
            if (typeof response.data.data === "string") {
                message = `${message} : ${response.data.data}`;
            }
            ElMessage.warning(message);
        }
    } else {
        console.log("Not a common response:");
        console.log(response.data)
    }
}

// 定义 post_form 和 post_json 函数，使用 post 函数进行封装
function postForm<T>({ url, body, success, failure = defaultFailure, error = defaultError }: PostParams<T>): void {
    post({ url, body, content_type: 'application/x-www-form-urlencoded', success, failure, error });
}
function postJson<T>({ url, body, success, failure = defaultFailure, error = defaultError }: PostParams<T>): void {
    post({ url, body, content_type: 'application/json', success, failure, error });
}

export {get, getResource, post, postJson, postForm}