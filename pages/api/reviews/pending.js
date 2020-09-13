/**
 * @file Get a list of pending reviews
 */

import db from '../../../data/db'

async function get (req, res) {
  const reviews = await db('reviews')
    .where({ completed: false })
    .select()
  
    console.log({ reviews })

  res.status(200).send(reviews)
}

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      get(req, res)
      break

    default:
      res.status(405)
      res.end()
  }
}
