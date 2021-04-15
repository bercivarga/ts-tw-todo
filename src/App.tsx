import React from 'react';
import './App.css';

import TodoProvider from './store';
import TodoList from './TodoList';

function App() {
	return (
		<div className="App">
			<TodoProvider>
				<div className="TodoContainer">
					<TodoList />
				</div>
			</TodoProvider>
		</div>
	);
}

export default App;
