import * as express from 'express';
import { Request, Response } from 'express';
import { db } from '../shared/firebase';
import IControllerBase from 'interfaces/IControllerBase.interface';
import { ITodo } from '../shared/interfaces/todo';
import { getNewDate } from '../shared/utils/date';

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
      const snapshot = await db.collection('todos').get();
      const todos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json({ data: todos, error: null });
    } catch (e) {
      res.status(400).json({ data: null, error: e.message });
    }
  };

  updateTodo = async (req: Request, res: Response) => {
    const { id, ...payload } = req.body;
    try {
      const updatedTodo = await db.collection('todos').doc(id).update(payload);

      //TODO: status code for update
      res.status(200).json({ data: updatedTodo, error: null });
    } catch (e) {
      res.status(400).json({ data: null, error: e.message });
    }
  };

  saveTodo = async (req: Request, res: Response) => {
    const { title, description, owner_id, update_at } = req.body;

    const todo: ITodo = {
      description,
      title,
      owner_id,
      completed: false,
      update_at,
    };
    try {
      const todoRef = await db.collection('todos').add(todo);
      const newTodo = await todoRef.get();

      res.status(201).json({ data: newTodo.data(), error: null });
    } catch (error) {
      res.json({ data: null, error });
    }
  };

  removeTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await db.collection('todos').doc(id).delete();
      res.status(200).json({ data: `todo ${id} deleted`, error: null });
    } catch (e) {
      res.status(400).json({ data: null, error: e.message });
    }
  };
}

export default TodoController;