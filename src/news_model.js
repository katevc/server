//Postgres Client
const { response } = require('express');

const config = require('./config')

const Pool = require('pg').Pool
const pool = new Pool({
  /*user: 'solstice',
  host: 'containerprod-pg.aws.vdc.it.umich.edu',
  database: 'solstice',
  password: 'ChangeMeNow_2020_solstice',
  port: 5432,*/

  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort
});

const getEntries = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM posts ORDER BY postid ASC', (error, results) => {
      if (error) {
        reject(error)
      } else {
        console.log(results)
      }
      resolve(results.rows);
      
    })
  }) 
}
const createEntry = (body) => {
  return new Promise(function(resolve, reject) {
    const { author, text, title } = body
    pool.query("INSERT INTO public.posts (author, text, title, date_created) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *", [author, text, title], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new entry has been added added`)
    })
  })
}

const deleteEntry = (postID) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(postID)
    pool.query('DELETE FROM public.posts WHERE postid = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Entry deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getEntries,
  createEntry,
  deleteEntry,
}