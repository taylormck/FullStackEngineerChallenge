/**
 * @file Get a list of pending reviews for an employee
 */

import { getPendingReviewsByReviewer } from '../../../../service/review'

async function get (req, res) {
  const {
    query: { id },
  } = req

  const reviews = await getPendingReviewsByReviewer(id)
  
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
