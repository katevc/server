//Postgres Client
const { response } = require('express');

//const config = require('./config')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'solstice',
  host: 'containerprod-pg.aws.vdc.it.umich.edu',
  database: 'solstice',
  password: 'ChangeMeNow_2020_solstice',
  port: 5432,

  /*user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort*/
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
    const { author, text, title, imageURL } = body
    //console.log("value of url", imageURL)
    pool.query("INSERT INTO public.posts (author, text, title, image_url, date_created) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)", [author, text, title, imageURL], (error, results) => {
      if (error) {
        //console.log(author, text, title, URL)
        reject(error)
      }
      resolve(`A new entry has been added. Author: ${author} text: ${text} title: ${title} URL:${imageURL}`)
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