import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { later } from '@ember/runloop';

module('Acceptance | todos', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /todos', async function(assert) {
    await visit('/todos');
    assert.equal(currentURL(), '/todos');
  });

  test('add a new item', async function(assert) {
    await visit('/todos');
    await fillIn('input.t-add-item', 'Complete test case');
    await click('button.t-add-item-submit');
    assert.equal(this.element.querySelector('.t-todo-list-item-2').textContent.trim(), 'Complete test case');
  });

  test('delete an item', async function(assert) {
    await visit('/todos');
    await click('button.t-todo-delete-item-1');
    assert.equal(this.element.querySelector('.t-todo-list-group').children.length, 1);
  });

  test('complete an item', async function(assert) {
    await visit('/todos');
    await click('span.t-checkbox-todo-list-item-0 input');
    assert.equal(this.element.querySelector('.t-completed-list-group').children.length, 1);
  });

  test('incomplete an item', async function(assert) {
    await visit('/todos');
    await click('span.t-checkbox-todo-list-item-0 input');
    await click('span.t-checkbox-completed-list-item-0 input');
    later(() => {
      assert.equal(this.element.querySelector('.t-todo-list-group').children.length, 2);
    }, 3000);
  });

   test('edit an item', async function(assert) {
    await visit('/todos');
    await click('button.t-todo-edit-item-1');
    await fillIn('input.t-edit-item', 'Edit test case');
    await click('button.t-edit-item-submit');
    later(() => {
      assert.equal(this.element.querySelector('.t-todo-list-item-1').textContent.trim(), 'Edit test case');
    }, 3000);
  });
});
