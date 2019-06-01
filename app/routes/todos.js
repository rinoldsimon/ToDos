import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('todo');
  },
  actions: {
    addTodo(description) {
      this.store.createRecord('todo', {
        description
      }).save();
      let controller = this.controllerFor('todos');
      controller.set('description', '');
    },
    deleteTodo(todo) {
      todo.deleteRecord();
      todo.save().then(() => {
        this.transitionTo('todos');
      });
    },
    toggleTodo(todo) {
      let isDone = todo.get('isDone');
      todo.set('isDone', !isDone);
      todo.save();
    }
  }
});
