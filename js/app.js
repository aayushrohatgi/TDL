// CODE EXPLAINED channel

// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// clear the local storage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Show todays date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add an item to the list user the enter key
document.addEventListener("keyup", function (even) {
    // debugger;
    if (event.keyCode == 13) {
        const toDo = input.value;
        let todoList = [];
        let id = 0;
        if (localStorage.getItem("TODO")) {
            todoList = JSON.parse(localStorage.getItem("TODO"));
            id = todoList.length;
        }
        // if the input isn't empty
        if (toDo) {
            addToView(toDo, id, false,  document.getElementById('myList'));

            todoList.push({
                name: toDo,
                id: id,
                completed: false
            });

            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(todoList));

            id++;
        }
        input.value = "";
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js').then(() => {
            console.log('Service Worker Registered')
        })
    })
}