const up = function (knex) {
    return knex.schema.createTable('User', function (table) {
      table.increments('id')
      table.integer('duckId')
      table.integer('timesCollected')
    })
  }
  
  const down = function (knex) {
    return knex.schema.dropTable('User')
  }
  
  export { up, down }
  
