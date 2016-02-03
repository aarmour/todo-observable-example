import {OpaqueToken, provide, Inject} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject';
import {Action, AddTodo} from '../actions';

interface AppState { todos: Todo[]; visibilityFilter: string; }

export const initState = new OpaqueToken('initState');
export const dispatcher = new OpaqueToken('dispatcher');
export const state = new OpaqueToken('state');

export const STATE_PROVIDERS = [
  provide(initState, {useValue: {todos: [], visibilityFilter: 'SHOW_ALL'}}),
  provide(dispatcher, {useValue: new Subject<Action>(null)}),
  provide(state, {useFactory: stateFn, deps: [new Inject(initState), new Inject(dispatcher)]})
];

/**
 * Creates the state Observable using the initial state
 * and an Observable of actions. This function is only
 * called once--any component that depends on the `state`
 * provider gets the Observable.
 */
export function createState(initialState, actions: Observable<Action>) {
  const combine = s => ({todos: s[0], visibilityFilter: s[1]});

  const appStateObs: Observable<AppState> =
    todos(initState.todos, actions).
    zip(filter(initState.visibilityFilter, actions)).
    map(combine);
  return wrapIntoBehavior(initState, appStateObs);
}
