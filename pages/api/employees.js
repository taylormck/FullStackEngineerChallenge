/**
 * @file List all users
 */

 import db from '../../data/db'

async function get (req, res) {
  const employees = await db('employees').select();

  res.status(200).send(employees)
}

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      get(req, res)
      break

    default:
      res.status(405)
      res.end()
  }
}
