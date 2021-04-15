import React, { useState } from 'react';
import { useTodoContext, useDispatchContext } from './store';

export default function TodoList() {
	const [ newTodo, setNewTodo ] = useState<string>('');

	const todos = useTodoContext();
	const dispatch = useDispatchContext();

	const handleDelete = (i: number) => {
		dispatch({ type: 'DELETE', id: i });
	};

	const handleAdd = (e: any) => {
		e.preventDefault();
		if (newTodo) {
			dispatch({ type: 'ADD', text: newTodo });
			setNewTodo('');
		}
	};

	return (
		<div className="flex flex-col items-center p-10 shadow-md w-2/4 bg-gray-200 rounded-md">
			<div className="flex flex-col w-full">
				{todos.map((t, i) => {
					return (
						<div
							key={i}
							className="flex flex-row justify-between mb-4 w-full shadow-sm items-center pl-4 bg-white rounded-md"
						>
							<p className="leading-normal">{t.text}</p>
							<button
								className="text-white text-sm bg-blue-600 px-5 py-3 rounded-sm uppercase tracking-wider font-semibold shadow-sm"
								onClick={(event: React.MouseEvent<HTMLElement>) => handleDelete(t.id)}
							>
								Delete
							</button>
						</div>
					);
				})}
			</div>

			<div>
				<form
					className="flex flex-row justify-between mb-4 w-full shadow-sm items-center bg-white rounded-md outline-none"
					onSubmit={(e) => handleAdd(e)}
				>
					<input
						className="pl-2 h-full text-lg outline-none"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
					/>
					<button
						className="outline-none px-3 py-2 bg-red-500 rounded-md text-white uppercase tracking-wider font-semibold"
						type="submit"
					>
						Add
					</button>
				</form>
			</div>
		</div>
	);
}
