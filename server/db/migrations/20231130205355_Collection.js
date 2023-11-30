const up = function (knex) {
  return knex.schema.createTable('Collection', function (table) {
    table.increments('id')
    table.integer('duckId')
    table.integer('auth0Id')
    table.integer('timesCollected')
  })
}

const down = function (knex) {
  return knex.schema.dropTable('Collection')
}

export { up, down }
