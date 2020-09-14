/**
 * @file Get info for employees
 */

import { isUndefined } from 'lodash'

import { addEmployee } from '../../service/employee'

async function post (req, res) {
  const employee = req.body

  if (isUndefined(employee.name) || employee.name === '') {
    res.status(422).end()
  }

  let insertedEmployeeId

  try {
    insertedEmployeeId = await addEmployee(employee)
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
      await post(req, res)
      break

    default:
      res.status(405)
      res.end()
  }
}
