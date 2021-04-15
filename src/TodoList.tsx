import React, { useState } from 'react';
import { useTodoContext, useDispatchContext } from './store';

export default function TodoList() {
	const [ newTodo, setNewTodo ] = useState<string>('');

	const todos = useTodoContext();
	const dispatch = useDispatchContext();

	const handleDelete = (i: number) => {
		dispatch({ type: 'DELETE', id: i });
	};

	const handleAdd = () => {
		dispatch({ type: 'ADD', text: newTodo });
	};

	return (
		<React.Fragment>
			{todos.map((t, i) => {
				return (
					<div key={i}>
						<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
							<p>{t.text}</p>
							<button onClick={(event: React.MouseEvent<HTMLElement>) => handleDelete(t.id)}>
								Delete
							</button>
						</div>
					</div>
				);
			})}
			<div>
				<input onChange={(e) => setNewTodo(e.target.value)} />
				<button onClick={(event: React.MouseEvent<HTMLElement>) => handleAdd()}>Add</button>
			</div>
		</React.Fragment>
	);
}
