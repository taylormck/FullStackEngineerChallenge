/**
 * @file List all users
 */

import { getEmployees } from '../../service/employee'

async function get (req, res) {
  const employees = await getEmployees()

  res.status(200).send(employees)
}

export default async (req, res) => {
  const { method } = req

  switch (req.method) {
    case 'GET':
      await get(req, res)
      break

    default:
      res.status(405)
      res.end()
  }
}
