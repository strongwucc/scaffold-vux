import Vue from 'vue'
import Http from './http'
import NP from 'number-precision'
//保留两位有效数字
Vue.filter("formatMoney",function(value,status){
    if(value == 'undefined' || value === '' || value == null) return 0
    value = parseFloat(value)
    if(status == 0){
        return NP.round(value,0)
    }
    if(status == 1){
        return NP.round(value,1)
    }
    return NP.round(value,2)
})

//保留两位有效数字且大于0的数字返回+
Vue.filter("formatMoneyAdd",function(value){
    value = parseFloat(value)
    if(value>0){
        return '+'+NP.round(value,2)

    }
    return NP.round(value,2)
})

//大于等于100 显示99+
Vue.filter("numHandle",function(num){
    if (parseInt(num) >= 100 ){
        num = "99+"
    }
    return num
})
//输出年月日
Vue.filter("toDate",function(number,is_hfs){
    var n = number*1000
    var date = ''
    if (number === '') {
        date = new Date()
    } else {
        date = new Date(n)
    }
    var Y = date.getFullYear()
    var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) 
    var D = (date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate())
    var H = (date.getHours() < 10 ? "0" + (date.getHours()) : date.getHours())
    var F = (date.getMinutes() < 10 ? "0" + (date.getMinutes()) : date.getMinutes())
    var S = (date.getSeconds() < 10 ? "0" + (date.getSeconds()) : date.getSeconds())

    if (is_hfs==1){
        return (Y+'-'+M+'-'+D)
    }else if (is_hfs==2){
        return (Y+'.'+M+'.'+D)
    }else if (is_hfs == 3){
        return (Y+'-'+M+'-'+D+' '+H+':'+F)
    }


    return (Y+'-'+M+'-'+D+' '+H+':'+F+':'+S)
})

//年月日时分秒 转化为 年月日
Vue.filter('dataTime', function (time) {
    if(typeof time != 'undefined'){
        time = time.substring(0,10)
    }
    return time
})

//输出图片路径编码
Vue.filter("picPath",function(path){
    if(typeof path != 'undefined' && path != ''){
        path = unescape(path)
    }
    return path
})

//去除反斜杠
Vue.filter('addressformat', function (item) {
    if(typeof item == 'string'){
        item = item.replace(/[\\ \/=]/g, "")
    }
    return item
})

//设置默认值
Vue.filter('setdefault', function (item, val) {
    if(typeof item == 'undefined' || item == '' || item == null){
        return val
    }
    return item
})

//把手机号处理加星
Vue.filter('mobileformat', function (item) {
    if(typeof item == 'string'){
        return item.substring(0,3)+"****"+item.substring(8,11)
    }
    return item
})

// 图片路径
Vue.filter('upload', function(item){
    var http = new Http()
    if(/^http(.*)$/.test(item)){
        return item
    }else{
        return http.upload_path + item
    }
})

// 字符串超出n个字显示...
Vue.filter('longStrFormat', function(item,n){
    if(item.length > n && n > 3){
        item = item.substr(0,n-3) + '...'
    }
    return item
})

