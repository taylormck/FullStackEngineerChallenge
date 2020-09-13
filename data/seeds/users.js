/**
 * @file Set up some initial users for development.
 */

exports.seed = async knex => {
  await knex('employees').del();
  await knex('reviews').del();

  await knex('employees').insert([{
    name: 'Jimmy',
  }, {
    name: 'Billy',
  }]);

  const { id: jimmyId } = await knex('employees')
    .where({ name: 'Jimmy' })
    .select('id')
    .first()

  const { id: billyId } = await knex('employees')
    .where({ name: 'Billy' })
    .select('id')
    .first()

  await knex('reviews').insert([{
    content: 'Jimmy is a great guy!',
    completed: true,
    reviewer_id: billyId,
    reviewee_id: jimmyId,
  }, {
    content: '',
    completed: false,
    reviewer_id: jimmyId,
    reviewee_id: billyId,
  }]);
};
