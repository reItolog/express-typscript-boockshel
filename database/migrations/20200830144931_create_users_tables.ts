import * as Knex from 'knex';
import { MEDIA, USERS } from '../../src/shared/constants/db';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists(`${MEDIA}`, (t) => {
    t.increments('id').primary();
    t.string('url');
    t.string('mime type');
    t.string('title');
    t.string('description');
  })
    .createTableIfNotExists(`${USERS}`, function (t) {
      t.increments('id').primary();
      t.string('name', 100);
      t.string('email', 100);
      t.string('password');
      t.integer('media_id').nullable();
      t.foreign('media_id').references('users.id');
    }).catch(e => {
      console.log(e.message);
    })

}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists(MEDIA)
    .dropTableIfExists(USERS);
}

