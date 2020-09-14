/**
 * @file Get info for user
 */

import { isUndefined } from 'lodash'

import {
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from '../../../service/employee'

async function get (req, res) {
  const {
    query: { id },
  } = req

  const employee = await getEmployee(id)

  if (isUndefined(employee)) {
    res.status(404).end()
  }
  else {
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
    await updateEmployee(id, employee)
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
    await deleteEmployee(id)
  }
  catch (e) {
    console.error('Error deleting emloyee:', e)

    // NOTE: Assuming our db is magic and never breaks, and that an error here
    // means that we couldn't find the entry to delete
    res.status(404).end()
    return
  }

  res.status(200).end()
}

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await get(req, res)
      break
    
    case 'PATCH':
      await patch(req, res)
      break

    case 'DELETE':
      await remove(req, res)
      break

    default:
      res.status(405).end()
  }
}
