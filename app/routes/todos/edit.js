import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    let todo = this.store.find('todo', params.id);
    return todo;
  },
  actions: {
    saveEdit(model, description) {
      model.setProperties({
        description
      });
      model.save().then(() => this.transitionTo('todos'));
    },
    cancelEdit(model) {
      if (model.hasDirtyAttributes) {
        model.rollbackAttributes();
      }
      this.transitionTo('todos');
    }
  }
});
