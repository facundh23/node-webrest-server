import fs from 'fs';
import http from 'http';

const server = http.createServer((req, res) => {
    console.log(req.url);
    // res.writeHead(200, {'Content-type': 'text/html'})
    // res.write('<h1>Hola Mundo</h1>');
    // res.end();

    // const data = {name:'Jhon Doe', age: 30, city:'San Julian'};
    // res.writeHead(200, {'Content-type': 'application/json'});
    // res.end(JSON.stringify(data))
    if(req.url === '/tutorial2'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, {'Content-type': 'text/html'})
        res.end(htmlFile)
  
    } else if (req.url === '/css/styles.css'){
        const cssFile = fs.readFileSync('./public/css/styles.css', 'utf-8')
        res.writeHead(200,{'Content-type': 'text/css'});
        res.end(cssFile)
    
    
    } else if(req.url === '/js/index.js'){ 
        const jsFile = fs.readFileSync('./public/js/index.js', 'utf-8')
        res.writeHead(200, {'Content-type': 'text/js'})
        res.end(jsFile)
    }else {
        res.writeHead(404, {'Content-type': 'text/html'})
        res.end();
    }
});

server.listen(8080, () => {
    console.log('Server running on port 8080')
})