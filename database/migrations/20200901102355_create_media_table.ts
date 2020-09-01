import * as Knex from 'knex';
import { MEDIA } from '../../src/shared/constants/db';


export async function up(knex: Knex): Promise<void> {
  knex.schema.hasTable(MEDIA).then(function(exists) {
    if (!exists) {
      return knex.schema.createTable(`${MEDIA}`, (t) => {
        t.increments('id').primary();
        t.integer('owner_id');
        t.foreign('owner_id').references('id').inTable('Users');
        t.string('url');
        t.string('mime_type');
        t.string('title');
        t.string('description');
      });
    }
  });

}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists(MEDIA);
}