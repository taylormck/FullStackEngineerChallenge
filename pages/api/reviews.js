/**
 * @file List all reviews
 */

import {
  getReviews,
} from '../../service/review'

async function get (req, res) {
  const reviews = await getReviews()

  res.status(200).send(reviews)
}

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await get(req, res)
      break

    default:
      res.status(405)
      res.end()
  }
}
