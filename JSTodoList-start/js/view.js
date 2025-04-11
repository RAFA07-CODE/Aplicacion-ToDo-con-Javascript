import addTodo from './components/add-todo.js';

export default class View {
    constructor() {
      this.model = null;
      this.table = document.getElementById('table');
      this.addTodoForm = new addTodo();
      

      this.addTodoForm.onClick((title, description) => this.addTodo(title, description));

    }
  
    setModel(model) {
      this.model = model;
    }
  
    addTodo(title, description) {
      const todo = this.model.addTodo(title, description);
      this.createRow(todo);
    }

    toggleCompleted(id) {x
      this.model.toggleCompleted(id);
    }

    removeTodo(id) {
      this.model.removeTodo(id);
      document.getElementById(id).remove();
    }

    createRow(todo) {
      const row = table.insertRow();
      row.setAttribute('id', todo.id);
      row.innerHTML = `
        <td>${todo.title}</td>
        <td>${todo.description}</td>
        <td class="text-center">
  
        </td>
        <td class="text-right">
  
        </td>
      `;
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.onclick = () => this.toggleCompleted(todo.id);
      row.children[2].appendChild(checkbox);
  
      const editBtn = document.createElement('button');
      editBtn.classList.add('btn', 'btn-primary', 'mb-1');
      editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
      editBtn.setAttribute('data-toggle', 'modal');
      editBtn.setAttribute('data-target', '#modal');
      editBtn.onclick = () => this.modal.setValues({
        id: todo.id,
        title: row.children[0].innerText,
        description: row.children[1].innerText,
        completed: row.children[2].children[0].checked,
      });
      row.children[3].appendChild(editBtn);
  
      const removeBtn = document.createElement('button');
      removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
      removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
      removeBtn.onclick = () => this.removeTodo(todo.id);
      row.children[3].appendChild(removeBtn);
    }

  } 