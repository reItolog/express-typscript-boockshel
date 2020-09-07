import * as express from 'express';
import { Request, Response } from 'express';
import { todoModel } from '../models/todo/todo.model';
import IControllerBase from 'interfaces/IControllerBase.interface';
import { ITodo } from '../shared/interfaces/todo';

class TodoController implements IControllerBase {
  public path = '/';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/todo', this.saveTodo);
    this.router.get('/todo', this.getTodos);
    this.router.patch('/todo', this.updateTodo);
    this.router.delete('/todo/:id', this.removeTodo);
  }

  getTodos = async (req: Request, res: Response) => {
    try {
      const todos = await todoModel.getTodos();
      res.status(200).json({ data: todos, error: null });
    } catch (e) {
      res.status(400).json({ data: null, error: e.message });
    }
  };

  updateTodo = async (req: Request, res: Response) => {
    const { id, ...payload } = req.body;
    console.log(payload);
    try {
      const updatedTodo = await todoModel.updateTodo(id, payload);

      //TODO: status code for update
      res.status(200).json({ data: updatedTodo, error: null });
    } catch (e) {
      res.status(400).json({ data: null, error: e.message });
    }
  };

  saveTodo = async (req: Request, res: Response) => {
    const { title, description, owner_id } = req.body;
    const newMedia: ITodo = {
      description,
      title,
      owner_id,
    };
    try {
      const newTodo = await todoModel.saveTodo(newMedia);
      res.status(201).json({ data: newTodo, error: null });
    } catch (error) {
      res.json({ data: null, error });
    }
  };

  removeTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await todoModel.deleteTodo(Number(id));
      res.status(200).json({ data: `todo ${id} deleted`, error: null });
    } catch (e) {
      res.status(400).json({ data: null, error: e.message });
    }
  };
}

export default TodoController;