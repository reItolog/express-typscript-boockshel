import * as Knex from 'knex';
import { USERS } from '../../src/shared/constants/db';

export async function up(knex: Knex): Promise<void> {
  knex.schema.hasTable(USERS).then(function(exists) {
    if (!exists) {
      return knex.schema.createTable(`${USERS}`, function(t) {
        t.increments('id').primary();
        t.string('first_name', 100).notNullable();
        t.string('last_name', 100).notNullable();
        t.string('email', 100).notNullable();
        t.string('avatar', 255).nullable();
        t.string('password').notNullable();
      });
    }
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists(USERS);
}