const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

class Todo {
	constructor(name) {
		this.name = name;
	}
}

class UI {
	generateTemplate(todo) {
		const html = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
				<span>${todo.name}</span>
				<i class="far fa-trash-alt delete"></i>
		  </li>
    `;
		list.innerHTML += html;
	}

	clearField() {
		addForm.add.value = "";
	}

	deleteTodo(value) {
		if (value.classList.contains("delete")) {
			value.parentElement.remove();
		}
	}

	filterTodos(value) {
		Array.from(list.children)
			.filter((todo) => !todo.textContent.toLowerCase().includes(value))
			.forEach((todo) => todo.classList.add("filtered"));

		Array.from(list.children)
			.filter((todo) => todo.textContent.toLowerCase().includes(value))
			.forEach((todo) => todo.classList.remove("filtered"));
	}
}

//Event Listener for Add Book
addForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const value = addForm.add.value;
	//Instantiate Todo
	const todo = new Todo(value);
	//Instantiate UI
	const ui = new UI();
	//Validation
	if (todo.name !== "") {
		ui.generateTemplate(todo);
		ui.clearField();
	}
});

//Delete Todo
list.addEventListener("click", (e) => {
	const value = e.target;
	const ui = new UI();
	ui.deleteTodo(value);
});

//Filter Todos
search.addEventListener("keyup", () => {
	const value = search.value.trim().toLowerCase();
	const ui = new UI();
	ui.filterTodos(value);
});
