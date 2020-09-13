/**
 * @file Get info for employees
 */

import db from '../../data/db'

async function post (req, res) {
  const employee = req.body

  if (!employee.name) {
    res.status(422).end()
  }

  let insertedEmployeeId

  try {
    insertedEmployeeId = await db('employees')
      .returning('id')
      .insert(employee)
  } catch (e) {
    console.error('Error adding employee:', e)
    res.status(500).end()
    return 
  }

  res.setHeader('Location', `/api/employee/${insertedEmployeeId}`)
  res.status(201).end()
}

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      post(req, res)
      break

    default:
      res.status(405)
      res.end()
  }
}
