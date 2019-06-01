import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    editTodo(todo) {
      this.transitionToRoute('todos.edit', todo.get('id'));
    }
  }
});
