var http = require('http')     //创建服务器模块
var fs = require('fs')        //读写文件
var path = require('path')    //处理URL
var url = require('url')      //自动解析URL，得到一些信息

// var server = http.createServer(function(req, res){
// 	try{
// 		var fileContent = fs.readFileSync(__dirname + '/sample' +req.url)
// 		res.write(fileContent)
// 	}catch(e){
// 		res.writeHead(404,'not found')//最简单的服务器
// 	}
// 	res.end()
// })

function staticRoot(staticPath, req, res){
	console.log(staticPath)
	console.log(req.url)
	var pathObj = url.parse(req.url, true)
	console.log(pathObj)
	if(pathObj.pathname === '/'){
		pathObj.pathname += 'test.html'
	}               //默认打开的是index.html

	var filePath = path.join(staticPath, pathObj.pathname)//得到绝对路径


//这是同步方式读取文件
// var fileContent = fs.readFileSync(filePath,'binary')
  // res.write(fileContent, 'binary')
  // res.end()


//异步方式读取文件，二进制的方式
	fs.readFile(filePath, 'binary', function(err, fileContent){
		if(err){
			console.log('404')
			res.writeHead(404, 'not found')
			res.end('<h1>404 Not Found</h1>')    //当URL是不存在的情况，服务器处理请求发送404
		}else{
			console.log('ok')
			res.writeHead(200, 'OK')
			res.write(fileContent, 'binary')     //当URL是存在的情况
			res.end()
		}
	})
}

console.log(path.join(__dirname, 'sample'))

var server = http.createServer(function(req, res){
	staticRoot(path.join(__dirname, 'sample'),req,res)//path内是绝对路径
})

server.listen(8787)
console.log('visit http://localhost:8787')