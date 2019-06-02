import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

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
});
