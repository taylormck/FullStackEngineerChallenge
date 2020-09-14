/**
 * @file List all users with review data attached
 */

import { getEmployeesWithReviewData } from '../../service/employee'

async function get (req, res) {
  const employees = await getEmployeesWithReviewData()

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
