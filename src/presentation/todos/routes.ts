import { Request, Response, Router } from "express";
import { TodosController } from "./controllers";


export class TodoRoutes {
    static get routes(): Router {
        const router = Router ();

        const todoController = new TodosController()

        // Solo mandamos la referencia a la función
        router.get('/',todoController.getTodos )
        // Esto de arriba es lo mismo que esto de abajo ya que se mandan la misma cantidad de argumentos en la misma posicion
        // router.get('/api/todos',(req, res) => todoController.getTodos(req, res) )
        router.get('/:id',todoController.getTodoById )

        router.post('/', todoController.createTodo)
        router.put('/:id', todoController.updateTodo)
        router.delete('/:id', todoController.deleteTodo)

    

        return router;
    }
}