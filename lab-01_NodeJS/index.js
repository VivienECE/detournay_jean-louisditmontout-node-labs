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

//Composition of the server
const handles = require('./handles')
const server = http.createServer(handles.serverHandle);
server.listen(8080)
