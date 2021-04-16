import React, { FormEvent, useState } from 'react';
import { useTodoContext, useDispatchContext } from './store';
import { SiTailwindcss, SiTypescript } from 'react-icons/si';

export default function TodoList() {
	const [ newTodo, setNewTodo ] = useState<string>('');

	const todos = useTodoContext();
	const dispatch = useDispatchContext();

	const handleDelete = (i: number) => {
		dispatch({ type: 'DELETE', id: i });
	};

	const handleAdd = (e: FormEvent) => {
		e.preventDefault();
		if (newTodo) {
			dispatch({ type: 'ADD', text: newTodo });
			setNewTodo('');
		}
	};

	return (
		<div className="flex flex-col items-center p-10 shadow-md md:w-2/4 bg-gray-200 rounded-md">
			<div className="flex flex-col w-full">
				{todos.map((t, i) => {
					return (
						<div
							key={i}
							className="flex flex-row justify-between mb-4 w-full shadow-sm items-center pl-4 bg-white rounded-md"
						>
							<p className="leading-normal pr-4 overflow-hidden text-gray-900">{t.text}</p>
							<button
								className="text-white text-sm bg-red-500 px-5 py-3 rounded-sm uppercase tracking-wider font-semibold shadow-sm"
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
						className="pl-2 pr-4 h-full text-base text-gray-900 outline-none"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
					/>
					<button
						className="outline-none px-3 py-2 bg-blue-600 rounded-sm text-white uppercase tracking-wider font-semibold"
						type="submit"
					>
						Add
					</button>
				</form>
			</div>

			<h2 className="font-bold text-gray-900 mb-4 mt-4">Powered by</h2>
			<div className="flex flex-row">
				<SiTypescript className="w-8 h-8 text-blue-900 mr-2" />
				<SiTailwindcss className="w-8 h-8 text-blue-900 ml-2" />
			</div>
		</div>
	);
}
