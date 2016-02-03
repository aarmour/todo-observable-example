import Todo from '../Todo';
import {Action, AddTodoAction, ToggleTodoAction} from '../../actions';
import merge from '../../utilities/merge';

export default function todos(state, action) {
  if (action instanceof AddTodoAction) {
    const newTodo = {id: action.todoId, text: action.text, completed: false};
    return [...state, newTodo];
  } else {
    return state.map(t => updateTodo(t, action));
  }
}

function updateTodo(todo: Todo, action: Action): Todo {
  if (action instanceof ToggleTodoAction) {
    return (action.id !== todo.id) ? todo : merge(todo, {completed: !todo.completed});
  } else {
    return todo;
  }
}
