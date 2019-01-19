const http  =  require('http');
const url   =  require ('url');
const path  =  require ('path');
const fs    =  require ('fs');
const hostname = '127.0.0.1';
const port = 3088;

const server = http.createServer(function (req, res) {
    
var uri       = url.parse(req.url).pathname ;
var filename  = path.join(process.cwd(),unescape(uri));

console.log(filename);

var status;

try {

    status = fs.lstatSync(filename);
    
} catch (e) {
    
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 Not Found !!!');
    return;

}

if (status.isFile()) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(filename).pipe(res);
}
else if (status.isDiretory()) {
    res.writeHead(302, {'Content-Type': 'text/plain'});
    res.end('404 Not Found !!!');
       
}
else{
    res.writeHead(302, {'Content-Type': 'text/plain'});
    res.end('404 Not Found !!!');
    

}

});



server.listen(port,hostname, () => {

    console.log ('Server is running');

});