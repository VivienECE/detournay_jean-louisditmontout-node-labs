// ./handles.js
// Necessary imports
// Import a module
const http = require('http')
// Import Node url module
const url = require('url')
// Import Node querystring module
const qs = require('querystring')

//Content var
const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' +
'    <body>' +
'         <p> Hello World !</p>' +
'    </body>' +
'</html>'

module.exports = {
  serverHandle: function (req, res) {
    const route = url.parse(req.url)
     const path = route.pathname
     const params = qs.parse(route.query)

    res.writeHead(200, {'Content-Type': 'text/html'});
    if (path === '/hello' && 'name' in params) {
      res.write('Hello ' + params['name'])
    }
    else if (path === '/') {
      res.write(content);
      res.end();
    }
    else{
      res.write('404 Note Found');
      res.end();
    }
  }
}
