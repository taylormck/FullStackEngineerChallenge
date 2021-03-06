/**
 * @file Get a list of pending reviews
 */

import { getPendingReviews } from '../../../service/review'

async function get (req, res) {
  const reviews = await getPendingReviews()
  
  res.status(200).send(reviews)
}

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      await get(req, res)
      break

    default:
      res.status(405)
      res.end()
  }
}
