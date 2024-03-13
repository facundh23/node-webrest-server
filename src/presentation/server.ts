import express from 'express';
import path from 'path';

interface Options {
    port:number;
    public_path:string
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly public_path: string

    constructor(options:Options){
        const {port, public_path = 'public'} = options;
        this.port = port;
        this.public_path = public_path
    }

     async start(){

    //  Middlewares

    // Public Folders

    this.app.use(express.static(this.public_path));

    // Cualquier otra peticion get que no este dentro de la carpeta publica
    // Aca podemos interceptar todas la request y las reponses 
    this.app.get('*', (req, res) => {
        // Asi aseguro que al recargar mi pagina no se me va a romper la aplicacion
        const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`);
        res.sendFile(indexPath);
        return;
    })

    this.app.listen(this.port , () => {
        console.log(`Server running on port ${this.port}`)
        })
     }
}