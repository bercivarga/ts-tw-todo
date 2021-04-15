import React from 'react';

import TodoProvider from './store';
import TodoList from './TodoList';

function App() {
	return (
		<TodoProvider>
			<div className="flex items-center justify-center h-screen">
				<TodoList />
			</div>
		</TodoProvider>
	);
}

export default App;
