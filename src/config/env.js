/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let rootUrl = ''
let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
    rootUrl = ''
    baseUrl = ''
} else if (process.env.NODE_ENV === 'production') {
    rootUrl = ''
    baseUrl = ''
}

export {
    rootUrl,
    baseUrl
}
