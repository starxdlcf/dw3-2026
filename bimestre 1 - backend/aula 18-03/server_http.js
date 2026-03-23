import http from 'http' 

http.createServer((req, res) => {
  console.log("chegou uma requisição")
  res.end("olá! tudo bem?")
}).listen(3000)
console.log("servidor online")