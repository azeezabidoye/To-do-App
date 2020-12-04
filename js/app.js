// Select Elements
const clear = document.querySelector('.clear');
const dateDisplay = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// Classes and Icons
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINETHROUGH = 'lineThrough';

// Display today's date
const options = {weekday: 'long', month: 'short', day: 'numeric'};
const today = new Date();
dateDisplay.innerHTML = today.toLocaleDateString('en-US', options);

// Variables 
let LIST, id;

// Add To-do function
const addToDo = (toDo, id, done, trash) => {

    if (trash) return;

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINETHROUGH : '';

    const item = `<li class="item">
            <i class="fa ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}">${toDo}</p>
            <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
            </li>`

    list.insertAdjacentHTML('beforeend', item);
}

// Get items from LocalStorage
let data = localStorage.getItem("TODO");

// Load list to User Interface
const loadList = (itemsArray) => {
    itemsArray.forEach((item) => {
        addToDo(item.name, item.id, item.done, item.trash);
    })
}

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST)
} else {
    LIST = [];
    id = 0;
}

// Add item to the list
document.addEventListener('keyup', (event) => {

    if (event.keyCode === 13) {
        const toDo = input.value;

        // If input is NOT empty
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push ({
                name: toDo,
                id: id,
                done: false,
                trash: false
            })

            // Add item to LocalStorage
            localStorage.setItem("TODO", JSON.stringify(LIST))

            id++;
        }
        input.value = '';
    }
})


// Clear items from LocalStorage
clear.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})

// Complete To-do
const completeToDo = (element) => {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINETHROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove To-do
const removeTodo = (element) => {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// Target Items Created
list.addEventListener('click', (event) => {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == 'complete') {
        completeToDo(element);
    } else if (elementJob == 'delete') {
        removeTodo(element);
    }

     // Add item to LocalStorage
     localStorage.setItem("TODO", JSON.stringify(LIST))
})