class Task {
	constructor(name, completed) {
		this.name = name;
		this.completed = completed;
	}

	set completed(completed) {
		this.completed = completed;
	}
}

class TodoList extends HTMLElement {
	constructor() {
		super();
		let shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = `<p> Your tasks : </p>`;
		let data = localStorage.getItem("TODO-list");
		if (data) {
			LIST = JSON.parse(data);
			id = LIST.length; // set the id to the last one in the list
			shadowRoot.innerHTML = `<ul>`;
			array.forEach(function (item) {
				shadowRoot.innerHTML = `<li>`;
				shadowRoot.innerHTML = `<i class="fa ${item.completed} co" job="complete" id="${item.name}"></i>
						<p class="text">${item.name}</p>
						<i class="fa fa-trash-o de" job="delete" id="${item.name}"></i>`;
				shadowRoot.innerHTML = `</li>`;
			});
			shadowRoot.innerHTML = `</ul>`;
		} else {
			// if data isn't empty
			LIST = [];
			id = 0;
		}
	}
}

window.customElements.define('to-do-list', TodoList);