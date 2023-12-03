const up = function (knex) {
  return knex.schema.createTable('Collection', function (table) {
    table.increments('id').primary()
    table.integer('duckId')
    table.integer('auth0Id')
    table.integer('timesCollected')
    table.string('username')
  })
}

const down = function (knex) {
  return knex.schema.dropTable('Collection')
}

export { up, down }
