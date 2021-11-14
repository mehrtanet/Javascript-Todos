// get todos from localStorage
let todos = localStorage.getItem("todos")

// try parse date or null
// stringify save object
try {
    todos = JSON.parse(todos)
    todos = todos.length ? todos : null
} catch (e) {
    todos = null
}

// set defult value if todos == null
if (!todos) {
    todos = [
        { content: "Shopping", status: true },
        { content: "Watch videos", status: false },
        { content: "Like videose", status: true },
    ]
    localStorage.setItem("todos", JSON.stringify(todos))

}
//func to create/update todos list in ul
function createTodos(todos) {
    let todosList = document.querySelector("#todos-list")
    todosList.innerHTML = ""

    // creat list tag for each todo
    todos.forEach((todo, index) => {
        let li = document.createElement("li")
        li.className = "list-group-item"
        let content = document.createElement("span")
        content.textContent = todo.content
        content.style.textDecoration = todo.status ? "initial" : 'line-through'
        let deleteBtn = document.createElement("img")
        deleteBtn.src = "media/delete.png"
        deleteBtn.alt = "delete icon"
        deleteBtn.className = 'float-right'

        // append conntent  and deletbtn to li
        li.append(content)
        li.append(deleteBtn)

        // append li  to todoList
        todosList.append(li)
            // add deleteBtn functionality
        deleteBtn.addEventListener("click", e => {
                todos.splice(index, 1)
                localStorage.setItem("todos", JSON.stringify(todos))
                createTodos(todos)
            })
            // add complete functionality
        content.addEventListener("click", e => {
            todos[index].status = !todos[index].status
            localStorage.setItem("todos", JSON.stringify(todos))
            createTodos(todos)
        })
    });
}
createTodos(todos)

// action add & search
let actions = document.querySelector("#actions")
let formWrapper = document.querySelector("#form-wrapper")

Array.from(actions.children).forEach(action => {
    // add todo
    if (action.dataset.action == "add") {
        action.addEventListener("click", e => {
            formWrapper.innerHTML = `
                <form id="add">
                    <input class="form-control" name="add" placeholder="Add todo ...  ">
                </form>
            `
            createTodos(todos)
            let add = document.querySelector("#add")
            add.addEventListener("submit", e => {
                e.preventDefault()
                if (add.add.value) {
                    todos.push({ content: add.add.value, status: true })
                    localStorage.setItem("todos", JSON.stringify(todos))
                    createTodos(todos)
                }
            })
        })
    } else if (action.dataset.action == "search") {
        // search todo
        action.addEventListener("click", e => {
            formWrapper.innerHTML = `
                <form id="search">
                    <input class="form-control" name="search" placeholder="Search todos ...  ">
                </form>
            `
            let search = document.querySelector("#search")
            search.addEventListener("keyup", e => {
                e.preventDefault()
                if (search.search.value) {
                    let filterd_todos = todos.filter(
                        todo => todo.content.toLowerCase().includes(search.search.value.toLowerCase())
                    )
                    createTodos(filterd_todos)
                } else {
                    createTodos(todos)
                }
            })
        })
    }
})