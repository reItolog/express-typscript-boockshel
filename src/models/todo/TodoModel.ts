import bookshelf from '../../db';
import { TODO } from '../../shared/constants/db';

const Todo = bookshelf.model('Todo', {
  tableName: TODO,
})

export default Todo;