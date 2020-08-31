import * as Knex from 'knex';
import { USERS } from '../../src/shared/constants/db';

export async function up(knex: Knex): Promise<void> {
  knex.schema.hasTable(USERS).then(function(exists) {
    if (!exists) {
      return knex.schema.createTable(`${USERS}`, function(t) {
        t.increments('id').primary();
        t.string('name', 100).notNullable();
        t.string('email', 100).notNullable();
        t.string('password').notNullable();
        t.integer('media_id').references('media.id').onDelete('CASCADE');
      });
    }
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists(USERS);
}

