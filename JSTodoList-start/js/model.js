export default class Model {
    constructor() {
      this.view = null;
      this.todos = JSON.parse(localStorage.getItem('todos'));
      if(!this.todos || this.todos.length<1){
        this.todos=[
          {
            id:0,
            title: 'Learn JS',
            description: 'Watch JS tutorials',
            completed: false,
          }
        ]
        this.currentId = 1;
      }else{
        this.currentId=this.todos[this.todos.length - 1].id + 1;
      }
      this.todos = JSON.parse(localStorage.getItem('todos'));
      if (!this.todos || this.todos.length < 1) {
        this.todos = [
          {
            id: 0,
            title: 'Learn JavaScript',
            description: 'Learn the basics of JavaScript',
            completed: false

          }
        ];
        this.currentId = 1;
      }else {
        this.currentId = this.todos[this.todos.length - 1].id + 1;
      }
    }
  
    setView(view) {
      this.view = view;
    }
    save(){
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  
    getTodos() {      
      return this.todos.map((todo) => ({...todo }));
    }

    findTodo(id) {
      return this.todos.findIndex((todo) => todo.id === id);
    }

    save(){
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }

  
    toggleCompleted(id) {
      const index = this.findTodo(id);
      const todo = this.todos[index];
      todo.completed = !todo.completed;
      this.save();
    }

    editTodo(id, values){
      const index= this.findTodo(id);
      Object.assign(this.todos[index], values);
      this.save();
    }

    addTodo(title, description) {
      const todo = { 
      id: this.currentId++, 
      title, 
      description: description,
      completed: false,
  }
  this.todos.push(todo);
  console.log(this.todos);
  this.save();
  return {...todo} // Return the new todo object
  }

  removeTodo(id) {
    const index = this.findTodo(id);
    this.todos.splice(index, 1); 
    this.save(); 
  }
}
 
  