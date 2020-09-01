import * as Knex from 'knex';
import { MEDIA } from '../../src/shared/constants/db';


export async function up(knex: Knex): Promise<void> {
  knex.schema.hasTable(MEDIA).then(function(exists) {
    if (!exists) {
      return knex.schema.createTable(`${MEDIA}`, (t) => {
        t.increments('id').primary();
        t.string('url');
        t.string('mime type');
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