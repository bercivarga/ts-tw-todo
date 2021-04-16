import { createContext, ReactNode, useContext, useReducer, Dispatch, useEffect } from 'react';

let initialState = [
	{
		id: 0,
		text: 'Hello',
		done: false
	},
	{
		id: 1,
		text: 'Yo',
		done: false
	}
];

type Action =
	| { type: 'ADD'; text: string }
	| { type: 'DELETE'; id: number }
	| { type: 'UPDATE'; storedState: TodoState };

type TodosDispatch = Dispatch<Action>;

export type TodoState = typeof initialState;

const TodoContext = createContext<typeof initialState>(initialState);

export const useTodoContext = () => useContext<TodoState>(TodoContext);

const DispatchContext = createContext<TodosDispatch | undefined>(undefined);

export const useDispatchContext = () => {
	const dispatch = useContext(DispatchContext);
	if (!dispatch) throw new Error('Provider not found!');
	return dispatch;
};

function todosReducer(state: TodoState, action: Action): TodoState {
	switch (action.type) {
		case 'ADD':
			const newId = Math.round(Math.random() * 100000);
			return [ ...state, { id: newId, text: action.text, done: false } ];
		case 'DELETE':
			return state.filter((todo) => todo.id !== action.id);
		case 'UPDATE':
			return [ ...action.storedState ];
		default:
			throw new Error('Action not handled');
	}
}

export default function TodoProvider({ children }: { children: ReactNode }) {
	const [ todos, dispatch ] = useReducer(todosReducer, initialState);

	useEffect(() => {
		const stateFromStorage = window.localStorage.getItem('todo_list');
		initialState = stateFromStorage && JSON.parse(stateFromStorage);
		if (initialState) {
			dispatch({ type: 'UPDATE', storedState: initialState });
		}
	}, []);

	useEffect(
		() => {
			const data = JSON.stringify(todos);
			window.localStorage.setItem('todo_list', data);
			console.log(todos);
		},
		[ todos ]
	);

	return (
		<TodoContext.Provider value={todos}>
			<DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
		</TodoContext.Provider>
	);
}
