import { Request, Response } from "express"

const todos = [
    {id:1, text:'Buy milk', completedAt: new Date()},
    {id:2, text:'Buy paper', completedAt: null},
    {id:3, text:'Buy water', completedAt: new Date()},
]

export class TodosController{


    // Dependency Injection: UN repositorio por ejemplo para poder usarlo mediante caso de uso
    constructor(){

    }

    public getTodos = (req: Request, res:Response) => {
        return res.json(todos)
    }

    public getTodoById = (req: Request, res:Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:'Id argument is not a number'})
        const todo = todos.find(todo => todo.id === id);
        (todo) ? res.json(todo) : res.status(404).json({error:`Todo with id ${id} not found`})
        
    }

    public createTodo = (req:Request, res:Response) => {
        // Solo exxtraigo la pieza necesaria asi evito cargar basura en mi Base de datos
        const { text  } = req.body;
        if(!text) return res.status(400).json({error: 'Text property is required'})

        const newTodo = {
            id: todos.length + 1,
            text:text,
            completedAt:null
        }

        todos.push( newTodo);
        res.json(newTodo)
    }

    public updateTodo = (req: Request, res:Response) => {
        // LOS OBJETOS EN JS SE PASAN POR REFERENCIA, ESTO ESTA MAL NO SE DEBERÍA HACER ASI 
        // convertimos a numero el id ya que viene como string
        const id = +req.params.id;
        // Su no existe el id o es erroneo devolvemos el error
        if(isNaN(id)) return res.status(400).json({error:'Id argument is not a number'})
        // Buscamos el todo
        const todo = todos.find(todo => todo.id === id);
        // Si no existe el todo
        if(!todo) return res.status(404).json({error:`Todo with id ${id} not found`});
        const { text, completedAt } = req.body;
        // if(!text) return res.status(400).json({error: 'Text property is required'})

        // Si viene un valor que lo use si no viene nada que mantenga el valor actual (paso uno para modificar el createdAt)
        todo.text = text || todo.text; 

        // Con la fecha como viene nula si asi me lo piden lo pondre null y sino la fecha anterior o existente
        (completedAt === null) ? todo.completedAt = null : todo.completedAt = new Date(completedAt || todo.completedAt)

        // Esto seria lo ideal: manejarlo de manera inmutable con un forEach por ejemplo LO VEMOS MAS ADELANTE 
        // todos.forEach((todo, index) => {
        //     if(todo.id === id){
        //         todos[index] = todo;
        //     }
        // })

        res.json(todo)
    }

    public deleteTodo = (req:Request, res: Response ) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error:'Id argument is not a number'});

        const todo = todos.find(todo => todo.id === id);
        // Si no existe el todo
        if(!todo) return res.status(404).json({error:`Todo with id ${id} not found`});

        todos.splice(todos.indexOf(todo), 1)

        
        res.json(todo);

    }
}