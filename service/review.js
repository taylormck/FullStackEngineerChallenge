/**
 * @file Service for reviews
 */

import db from '../data/db'

export async function getReviews () {
  const reviews = await db('reviews')
    .select()
  
  return reviews
}

export async function getCompletedReviews () {
  const reviews = await db('reviews')
    .where({ completed: true })
    .select()

  return reviews
}

export async function getCompletedReviewsByReviewee (reviewee_id) {
  // Intentionally not joining to users to get the Reviewer's name.
  // This makes reviews anonymous, which is usually a goal with
  // employee reviews.
  const reviews = await db('reviews')
    .where({
      reviewee_id,
      completed: true,
    })
    .select()

  return reviews
}

export async function getPendingReviews () {
  const reviews = await db('reviews')
    .where({ completed: false })
    .select()

  return reviews
}

export async function getPendingReviewsByReviewer (reviewer_id) {
  const reviews = await db('reviews')
    .where({
      reviewer_id,
      completed: false,
    })
    .join('employees', 'employees.id', 'reviews.reviewee_id')
    .select('employees.name', 'employees.id')

  return reviews
}

export async function postReview (review) {
  await db('reviews').insert(review)
}

export async function submitReview (reviewer_id, reviewee_id, content) {
  const review = {
    reviewer_id,
    reviewee_id,
    content,
    completed: true,
  }
  
  await db('reviews')
    .where({ reviewer_id, reviewee_id })
    .update(review)
}
