import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  notify: service(),
  model(params) {
    let todo = this.store.find('todo', params.id);
    return todo;
  },
  actions: {
    saveEdit(model, description) {
      model.setProperties({
        description
      });
      model.save().then(() => {
        this.transitionTo('todos');
        this.notify.success('Item Updated');
      });
    },
    cancelEdit(model) {
      if (model.hasDirtyAttributes) {
        model.rollbackAttributes();
      }
      this.transitionTo('todos');
    }
  }
});
