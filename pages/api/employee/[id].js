/**
 * @file Get info for user
 */

import db from '../../../data/db'

async function get (req, res) {
  const {
    query: { id }
  } = req

  const employees = await db('employees')
    .where({ id })
    .select();

  if (employees.length === 0) {
    res.status(404).end()
  }
  else {
    const employee = employees[0]
    res.status(200).send(employee)
  }
}

async function patch (req, res) {
  const {
    query: { id },
    body: employee
  } = req

  if (!id || !employee) {
    res.status(422).end()
    return
  }

  try {
    await db('employees')
      .where({ id })
      .update(employee)
  }
  catch (e) {
    // NOTE: Assuming our db is magic and never breaks, and that an error here
    // means that we couldn't find the entry to update
    res.status(404).end()
    return
  }

  res.status(200).end()
}

// Note: can't name a function "delete" in javascript
async function remove (req, res) {
  const {
    query: { id },
  } = req

  try {
    await db('employees')
      .where({ id })
      .del()
  }
  catch {
    // NOTE: Assuming our db is magic and never breaks, and that an error here
    // means that we couldn't find the entry to delete
    res.status(404).end()
    return
  }

  res.status(200).end()
}

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      get(req, res)
      break
    
    case 'PATCH':
      patch(req, res)
      break

    case 'DELETE':
      remove(req, res)
      break

    default:
      res.status(405)
      res.end()
  }
}
