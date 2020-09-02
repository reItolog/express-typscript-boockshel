import * as Knex from 'knex';
import { TODO } from '../../src/shared/constants/db';


export async function up(knex: Knex): Promise<void> {
  knex.schema.hasTable(TODO).then(function(exists) {
    if (!exists) {
      return knex.schema.createTable(`${TODO}`, (t) => {
        t.increments('id').primary();
        t.integer('owner_id');
        t.foreign('owner_id').references('id').inTable('Users');
        t.string('title', 80).notNullable();
        t.string('description', 255).notNullable();
        t.boolean('compleated').defaultTo(false);
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('update_at').defaultTo(knex.fn.now());
      });
    }
  });

}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists(TODO);
}

