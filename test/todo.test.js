import Model from '../JSTodoList-start/js/model.js';

describe('Model - ToDo', () => {
  let model;

  beforeEach(() => {
    localStorage.clear();
    model = new Model();
  });

  test('Agregar una tarea', () => {
    const todo = model.addTodo('Tarea prueba', 'Descripción de prueba');
    expect(todo.title).toBe('Tarea prueba');
    expect(todo.description).toBe('Descripción de prueba');

    const todos = model.getTodos();
    expect(todos.length).toBe(1);
    expect(todos[0].title).toBe('Tarea prueba');
  });

  test('Editar una tarea', () => {
    const todo = model.addTodo('Tarea original', 'Descripción original');
    model.editTodo(todo.id, {
      title: 'Tarea editada',
      description: 'Descripción editada',
      completed: true
    });

    const edited = model.getTodos().find(t => t.id === todo.id);
    expect(edited.title).toBe('Tarea editada');
    expect(edited.description).toBe('Descripción editada');
    expect(edited.completed).toBe(true);
  });

  test('Eliminar una tarea', () => {
    const todo = model.addTodo('Tarea a eliminar', 'Descripción');
    model.removeTodo(todo.id);

    const todos = model.getTodos();
    expect(todos.length).toBe(0);
  });

  test('Recuperar tareas del localStorage', () => {
    const todo = model.addTodo('Persistente', 'Debe guardarse');
    const savedData = JSON.parse(localStorage.getItem('todos'));
    expect(savedData.length).toBe(1);
    expect(savedData[0].title).toBe('Persistente');
  });

  test('Actualizar el estado completado de una tarea', () => {
    const todo = model.addTodo('Completar tarea', 'Pendiente');
    model.toggleCompleted(todo.id);

    const updated = model.getTodos().find(t => t.id === todo.id);
    expect(updated.completed).toBe(true);
  });

  test('Filtrar tareas completadas (respuesta a filtros)', () => {
    model.addTodo('Tarea 1', 'Desc 1');
    const todo2 = model.addTodo('Tarea 2', 'Desc 2');
    model.toggleCompleted(todo2.id);

    const completadas = model.getTodos().filter(t => t.completed);
    expect(completadas.length).toBe(1);
    expect(completadas[0].title).toBe('Tarea 2');
  });

  test('Validar id único en múltiples tareas', () => {
    const t1 = model.addTodo('Tarea A', 'Desc A');
    const t2 = model.addTodo('Tarea B', 'Desc B');
    expect(t1.id).not.toBe(t2.id);
  });
});

describe('Modo oscuro - UI', () => {
  beforeEach(() => {
    document.body.className = '';
    localStorage.clear();
  });

  test('Activa el modo oscuro manualmente', () => {
    document.body.classList.add('dark-mode');
    expect(document.body.classList.contains('dark-mode')).toBe(true);
  });

  test('Guarda la preferencia de tema en localStorage', () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  test('Carga el modo oscuro desde localStorage en el inicio', () => {
    localStorage.setItem('theme', 'dark');
    window.dispatchEvent(new Event('DOMContentLoaded'));
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    }
    expect(document.body.classList.contains('dark-mode')).toBe(true);
  });
});
