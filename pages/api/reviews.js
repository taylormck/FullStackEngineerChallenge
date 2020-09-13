/**
 * @file List all reviews
 */

import db from '../../data/db'

async function get (req, res) {
  const reviews = await db('reviews').select();

  res.status(200).send(reviews)
}

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      get(req, res)
      break

    default:
      res.status(405)
      res.end()
  }
}
