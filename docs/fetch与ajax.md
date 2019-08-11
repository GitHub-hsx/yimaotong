### fetch
- 简易学习   https://segmentfault.com/a/1190000011433064
- fetch api 具体的请求参数 https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API

## fetch
目前版本的fetch 用的是做过封装的
使用时 request(url,options).then().then().catch()   
其中 options 就是 fetch 的请求参数


### fetch 具体使用样例

```js
// Example POST method implementation:


postData(`http://example.com/answer`, {answer: 42})
  .then(data => console.log(data)) // JSON from `response.json()` call
  .catch(error => console.error(error));

const postData = (url = ``, data = {}) => {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()) // parses response to JSON
    .catch(error => console.error(`Fetch Error =\n`, error));
};
```


### 原生ajax

```js
var xhr;
if (window.XMLHttpRequest) {　 // Mozilla, Safari...
  　xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
  　try {
    　xhr = new ActiveXObject('Msxml2.XMLHTTP');
 　 } catch (e) {
  　  try {
    　  xhr = new ActiveXObject('Microsoft.XMLHTTP');
   　 } catch (e) {}
 　 }
}
if (xhr) {
  　xhr.onreadystatechange = onReadyStateChange;
 　 xhr.open('POST', '/api', true);
 　 // 设置 Content-Type 为 application/x-www-form-urlencoded
 　 // 以表单的形式传递数据
  　xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 　 xhr.send('username=admin&password=root');
}

// onreadystatechange 方法
function onReadyStateChange() {
 　 // 该函数会被调用四次
  　console.log(xhr.readyState);
  　if (xhr.readyState === 4) {
   　　 // everything is good, the response is received
    　　if (xhr.status === 200) {
      　　　console.log(xhr.responseText);
    　　} else {
      　　　console.log('There was a problem with the request.');
   　　 }
  　} else {
    　　// still not ready
    　　console.log('still not ready...');
  　}
}

```
### jquery  ajax

```js
$.ajax({
    method: 'POST',
    url: '/api',
    data: { username: 'admin', password: 'root' }
})
  .done(function(msg) {
      alert( 'Data Saved: ' + msg );
  });
  
```