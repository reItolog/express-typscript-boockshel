import Knex from 'knex';
import bookshelf from 'bookshelf';
import knexConf from '../knexfile';

export const knex = Knex(knexConf);

// @ts-ignore
export default bookshelf(knex).plugin('bookshelf-virtuals-plugin');