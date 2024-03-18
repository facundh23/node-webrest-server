import express, { Router } from 'express';
import cors from 'cors';
import path from 'path';

interface Options {
    port:number;
    public_path?:string;
    routes: Router;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly public_path: string
    private readonly routes:Router;

    constructor(options:Options){
        const {port, public_path = 'public', routes} = options;
        this.port = port;
        this.public_path = public_path
        this.routes = routes
    }

     async start(){
         //  this.app.use(cors())
         
         //  Middlewares
         // Cualquier peticion que haga va a pasar por este middleware y si viene el body lo va a serializar como un json (RAW)
         this.app.use(express.json());
         // Leer peticiones  con formato x-www-form-url 
         this.app.use(express.urlencoded({extended:true}));
         
        // Public Folders
        this.app.use(express.static(this.public_path));
        // Routes
        this.app.use(this.routes)

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

