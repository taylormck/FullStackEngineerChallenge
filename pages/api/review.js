/**
 * @file Get info for user
 */

import { isUndefined } from 'lodash'

import db from '../../data/db'

async function post (req, res) {
  const {
    body: {
      reviewer_id,
      reviewee_id,
      // NOTE: For now, we assume that we can't fill in the content.
      // This is because the admin is going to make this post call, and
      // the assigned employee is going to be making the patch call later
    },
  } = req

  if (isUndefined(reviewer_id) || isUndefined(reviewee_id)) {
    res.status(422).end()
    return
  }

  const review = {
    reviewer_id,
    reviewee_id,
  }

  try {
    await db('reviews').insert(review)
  }
  catch {
    res.status(500).end()
    return
  }

  res.status(201).end()
}

async function patch (req, res) {
  const {
    body: {
      reviewer_id,
      reviewee_id,
      content,
    },
  } = req

  const review = {
    reviewer_id,
    reviewee_id,
    content,
    completed: true,
  }
  
  try {
    await db('reviews')
      .where({ reviewer_id, reviewee_id })
      .update(review)
  }
  catch (e) {
    res.status(404).end()
    return
  }

  res.status(200).end()
}

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      post(req, res)
      break
    
    case 'PATCH':
      patch(req, res)
      break

    default:
      res.status(405)
      res.end()
  }
}
