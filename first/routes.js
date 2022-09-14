const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        //res.writeHead(302, {}) 를 아래 2줄로 대체함.
        res.statusCode = 302;
        res.setHeader('Location', '/');
        // ㄴ> Location은 default헤더. Location을 '/' 로 사용하게 되면,
        // 이미 실행중인 호스트를 자동으로 사용하게된다.
        return res.end();
      });
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
};

module.exports = requestHandler;

module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
};

module.exports.handler = requestHandler;
module.exports.someText = 'Some text';

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
// //? ㄴ> Node.js 만의 module. 이 생략된 키워드!