/**
 * @file Service for employees
 */

import {Promise} from "bluebird";

import db from '../data/db'

import {
  getCompletedReviewsByReviewee,
  getPendingReviewsByReviewer,
} from './review'

export async function getEmployees (opt = {}) {
  const employees = await db('employees')
    .where(opt)
    .select()

  return employees
}

export async function getEmployeesWithReviewData (opt = {}) {
  const employees = await getEmployees(opt)

  const employeesWithData = Promise.map(employees, async e => {
    const reviews = await getCompletedReviewsByReviewee(e.id)
    const pendingReviews = await getPendingReviewsByReviewer(e.id)

    return {
      ...e,
      reviews,
      pendingReviews,
    }
  })

  return employeesWithData
}

export async function getEmployee (id) {
  const employee = await db('employees')
    .where({ id })
    .select()
    .first()

  return employee
}

export async function addEmployee (employee) {
  return await db('employees')
    .returning('id')
    .insert(employee)
}

export async function updateEmployee (id, employee) {
  await db('employees')
    .where({ id })
    .update(employee)
}

export async function deleteEmployee (id) {
  await db('reviews')
    .where('reviewer_id', id)
    .orWhere('reviewee_id', id)
    .del()

  await db('employees')
    .where({ id })
    .del()
}
