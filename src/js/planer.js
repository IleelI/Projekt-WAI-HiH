import "../scss/planer.scss";

const input_todo = document.querySelector('.todo__input');
const add_todo_btn = document.querySelector('.add__todo');
const todo_list = document.querySelector('.todo__list');

const createTodo = (textValue) => {
    const newTodo = document.createElement('li');
    const todo_text = document.createElement('p');
    const icons_wrapper = document.createElement('div');
    const icon_trash = document.createElement('i');
    const icon_finish = document.createElement('i');

    newTodo.classList.add('todo');
    todo_text.classList.add('todo__text');
    todo_text.innerText = textValue;
    icons_wrapper.classList.add('icons');
    icon_finish.classList.add('finish__todo', 'fa','fa-check','fa-sm');
    icon_trash.classList.add('remove__todo', 'fa','fa-trash','fa-sm');

    icons_wrapper.append(icon_finish, icon_trash);
    newTodo.append(todo_text, icons_wrapper);
    icon_trash.addEventListener('click',(event) => {
        if (event.target === icon_trash) {
            localStorage.removeItem(`todo ${todo_list.childElementCount-1}`);
            newTodo.remove();
        };
    });
    icon_finish.addEventListener('click', (event) => {
        if (event.target === icon_finish) {
            todo_text.classList.toggle('todo__text--active');
        }
    })
    return newTodo;
}
const addToto = (todo_value) => {
    if (todo_value === '') {}
    else {
        todo_list.prepend(createTodo(todo_value));
        input_todo.value = '';
    }
}
const initTodos = () => {
    if (localStorage.getItem(localStorage.key(0)) !== '') {
        for (let i = 1; i <= localStorage.length; i++) {
            let todo_text = localStorage.getItem(`todo ${i}`);
            addToto(todo_text);
        }
    }
}

input_todo.addEventListener('keypress', (event) => {
    let todo_value = input_todo.value;
    if (event.keyCode === 13) {
        localStorage.setItem(`todo ${todo_list.childElementCount}`, todo_value);
        addToto(todo_value);
    }
});
add_todo_btn.addEventListener('click', (event) => {
    let todo_value = input_todo.value;
    if (event.currentTarget === add_todo_btn) {
        localStorage.setItem(`todo ${todo_list.childElementCount}`, todo_value);
        addToto(todo_value);
    }
})

$(".input__sex").tooltip({
    position: {
        my: "left",
        at: "right",
        collision: "none",
        color: "white"
    }
});

$(".hide").on('click', () => {
    $(".input__sex").toggle('slow');
});

window.onload = () => {
    initTodos();
}