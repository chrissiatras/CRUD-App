exports.up = function(knex, Promise) {
  return knex.schema.createTable('vessel', (table) => {
  	table.varchar('imo');
  	table.varchar('mmsi');
  	table.varchar('shipname');
  	table.varchar('flag');
  	table.varchar('vtype');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('vessel');
};
