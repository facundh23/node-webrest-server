import fs from 'fs';
import http2 from 'http2';

const server = http2.createSecureServer({
    key:fs.readFileSync('./keys/server.key'),
    cert:fs.readFileSync('./keys/server.crt')
},(req, res) => {
    console.log(req.url);
    // res.writeHead(200, {'Content-type': 'text/html'})
    // res.write('<h1>Hola Mundo</h1>');
    // res.end();

    // const data = {name:'Jhon Doe', age: 30, city:'San Julian'};
    // res.writeHead(200, {'Content-type': 'application/json'});
    // res.end(JSON.stringify(data))
    if(req.url === '/'){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, {'Content-type': 'text/html'})
        res.end(htmlFile)
        return
  
    }
    if (req.url.endsWith('.css')){

        res.writeHead(200,{'Content-type': 'text/css'});
        
    }  
    
    if(req.url.endsWith('.js')){ 
        
        res.writeHead(200, {'Content-type': 'application/javascript'})
        
    }

    try {
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
        res.end(responseContent)
    } catch (error) {
        console.log(error)
    }
});

server.listen(8080, () => {
    console.log('Server running on port 8080')
})