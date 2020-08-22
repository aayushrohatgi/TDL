// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

class TodoList extends HTMLElement {
	constructor() {
		super();
		let ele = this;
		let shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.innerHTML = `<p> Your tasks : </p>
		<ul></ul>
		<link rel="stylesheet" href="css/font-awesome.css"></link>
		<link rel="stylesheet" href="css/todolist.css"></link>`;

		shadowRoot.insertAjacentHTML = `<p> Your tasks : </p>`;
		shadowRoot.insertAjacentHTML = `<p> Your tasks : </p>`;
		let data = localStorage.getItem("TODO");
		if (data) {
			let LIST = JSON.parse(data);
			LIST.forEach(function (item) {
				addToView(item.name, item.id, item.completed, ele);
			});
		}
	}
}

let addToView = function(toDo, id, completed, element) {
	var li = document.createElement('li');
	li.setAttribute("class", "item");
	var circle = document.createElement('i');
	circle.setAttribute("id", id);
	circle.setAttribute("job", "complete");
	if (completed) {
		circle.setAttribute("class", "fa fa-check-circle co");
	} else {
		circle.setAttribute("class", "fa fa-circle-thin co");
	}
	circle.addEventListener("click", function (event) {
		completeToDo(event.target);
	});
	li.appendChild(circle);
	var p = document.createElement('p');
	if (completed) {
		p.setAttribute("class", "text " + LINE_THROUGH);
	} else {
		p.setAttribute("class", "text");
	}
	p.textContent = toDo;
	li.appendChild(p);
	var i = document.createElement('i');
	i.setAttribute("class", "fa fa-trash-o de");
	i.setAttribute("id", id);
	i.setAttribute("job", "delete");
	i.addEventListener("click", function (event) {
		removeToDo(event.target);
	});
	li.appendChild(i);
	element.shadowRoot.querySelector("ul").appendChild(li);
}

function completeToDo(element) {
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
	var list = JSON.parse(localStorage.getItem("TODO"));
	list[element.id].completed = list[element.id].completed ? false : true;
	localStorage.setItem("TODO", JSON.stringify(list));
}

function removeToDo(element) {
	element.parentNode.parentNode.removeChild(element.parentNode);
	var list = JSON.parse(localStorage.getItem("TODO"));
	list.splice(list.indexOf(list[element.id]), 1);
	localStorage.setItem("TODO", JSON.stringify(list));
}

window.customElements.define('to-do-list', TodoList);