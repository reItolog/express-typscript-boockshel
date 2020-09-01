import * as Knex from 'knex';
import { USER_MEDIA } from '../../src/shared/constants/db';


export async function up(knex: Knex): Promise<void> {
  knex.schema.hasTable(USER_MEDIA).then(function(exists) {
    if (!exists) {
      return knex.schema.createTable(`${USER_MEDIA}`, (t) => {
        t.increments('id').primary();
        t.string('user_name');
        t.string('description');
        t.string('src');
        t.string('purpose');
      });
    }
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists(USER_MEDIA);
}