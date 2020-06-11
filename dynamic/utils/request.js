//统一接口封装
const API_BASE_URL = 'http://101.37.31.188:8080';
const get = (url, data) => { 
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: "get",
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)
        
      },
      fail:() => {wx.showToast({title:"网络请求失败", icon:"none"});}

    })
  });
}
 const post = (url, data) => {
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url      : _url,
      data     : data,
      method   : "POST",
      dataType : "json",
      header: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      success(request) {
        resolve(request.data)
      },
      fail:() => {wx.showToast({title:"网络请求失败", icon:"none"});}
    })
  });
}


const put = (url, data) => {

  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url      : _url,
      data     : data,
      method   : "PUT",
      dataType : "json",
      header: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      success(request) {
        resolve(request.data)
      },
      fail:() => {wx.showToast({title:"网络请求失败", icon:"none"});}
    })
  });
}

module.exports ={
  getDynamic:(data) =>{
    return post('/dynamic',data)//获取所有动态
  },
  insComment:(data) =>{
    return post('/dynamic/comment/insert',data)//添加评论
  },
  insReply:(data) =>{
    return post('/dynamic/replyComment/insert',data)//添加评论的回复
  },
}