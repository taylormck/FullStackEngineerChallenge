/**
 * 
 * @file Create the initial DB schema
 */

exports.up = knex => knex.schema
  .createTable('employees', t => {
    t.increments('id')
    t.string('name').notNullable()
  })
  .createTable('reviews', t => {
    t.text('content').defaultTo('')
    t.boolean('completed').defaultTo(false)

    t.integer('reviewer_id')
      .unsigned()
      .references('id')
      .inTable('employees')

    t.integer('reviewee_id')
      .unsigned()
      .references('id')
      .inTable('employees')
  })

exports.down = knex => knex.schema
  .dropTableIfExists('reviews')
  .dropTableIfExists('employees')
