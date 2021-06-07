// 是一个对象，默认为开发环境 {BASE_URL: "/", NODE_ENV: "development"}
// console.log(process.env) 

export default {
    baseURL: process.env.NODE_ENV === 'development' ? 'http://loaclhost:3000' : '线上地址'
}

