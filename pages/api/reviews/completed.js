/**
 * @file Get a list of completed reviews
 */

import { getCompletedReviews } from '../../../service/review'

async function get (req, res) {
  const reviews = await getCompletedReviews()
  
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
