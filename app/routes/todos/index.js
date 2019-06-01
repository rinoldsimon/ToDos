import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  notify: service(),
  model() {
    return this.store.findAll('todo');
  },
  actions: {
    addTodo(description) {
      this.store.createRecord('todo', {
        description
      }).save();
      let controller = this.controllerFor('todos.index');
      controller.set('description', '');
      this.notify.success('Item Added');
    },
    deleteTodo(todo) {
      todo.deleteRecord();
      todo.save().then(() => {
        this.notify.error('Item Deleted');
      });
    },
    toggleTodo(todo) {
      let isDone = todo.get('isDone');
      todo.set('isDone', !isDone);
      todo.save().then(() => {
        if (!isDone) {
          this.notify.success('Item Completed');
        }
      });
    }
  }
});
