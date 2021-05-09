//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-List');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions

function addTodo(event){
	//Preventing form from submitting
	event.preventDefault(); 
	//Todo DIV
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//Create LI
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	//Add todo to LocalStorage
	saveLocalTodos(todoInput.value);
	//Check Button
	const completeButton = document.createElement("button");
	completeButton.innerHTML = '<i class="fas fa-check"></i>';
	completeButton.classList.add("complete-btn");
	todoDiv.appendChild(completeButton);
	//Delete Button
	const deleteButton = document.createElement("button");
	deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
	deleteButton.classList.add("delete-btn");
	todoDiv.appendChild(deleteButton);
	//Append to the List
	todoList.appendChild(todoDiv);
	//Clear todo input value
	todoInput.value = "";
}

function deleteCheck(e){
	const item = e.target;
	//Delete todo
	if(item.classList[0] === 'delete-btn'){
		const todo = item.parentElement;
		//Animation
		todo.classList.add("fall");
		removeLocalTodos(todo);
		todo.addEventListener('transitionend',function(){
			todo.remove();
		});
	}
	//Check button
	if(item.classList[0] === 'complete-btn'){
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}

function filterTodo(e){
	const todos = todoList.childNodes;
	todos.forEach(function(todo){
		switch(e.target.value){
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if(todo.classList.contains("completed")){
					todo.style.display = "flex";
				}
				else{
					todo.style.display = "none";
				}
				break;
			case "completed":
				if(!qtodo.classList.contains("completed")){
					todo.style.display = "flex";
				}
				else{
					todo.style.display = "none";
				}
				break;
		}
	});
}

function saveLocalTodos(todo){
	//Check whether I have some todo in local storage
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
	//Check whether I have some todo in local storage
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach(function(todo){
		//Todo DIV
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		//Create LI
		const newTodo = document.createElement("li");
		newTodo.innerText = todo;
		newTodo.classList.add('todo-item');
		todoDiv.appendChild(newTodo);
		//Check Button
		const completeButton = document.createElement("button");
		completeButton.innerHTML = '<i class="fas fa-check"></i>';
		completeButton.classList.add("complete-btn");
		todoDiv.appendChild(completeButton);
		//Delete Button
		const deleteButton = document.createElement("button");
		deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
		deleteButton.classList.add("delete-btn");
		todoDiv.appendChild(deleteButton);
		//Append to the List
		todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo){
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	}else{
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}