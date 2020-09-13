/**
 * @file Service for employees
 */

import db from '../data/db'

export async function getEmployees (opt = {}) {
  const employees = await db('employees')
    .where(opt)
    .select()

  return employees
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
  await db('employees')
    .where({ id })
    .del()
}
