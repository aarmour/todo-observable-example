import AddTodoAction from './AddTodoAction';
import SetVisibilityFilterAction './SetVisibilityFilterAction';
import ToggleTodoAction from './ToggleTodoAction';

export AddTodoAction;
export SetVisibilityFilterAction;
export ToggleTodoAction;

export type Action = AddTodoAction | SetVisibilityFilterAction | ToggleTodoAction;
