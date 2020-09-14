/**
 * @file The page for admins
 */

import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Layout from '../components/layout'

import EmployeeList from '../components/employeeList'


const useStyles = makeStyles((theme) => ({
  root: {
  },
}))

export default function Admin() {
  const [employees, setEmployees] = useState([])

  const updateEmployees = async () => {
    const response = await fetch('/api/employeesWithReviews')

    if (response.ok) {
      const newEmployees = await response.json()
      setEmployees(newEmployees)
    }
  }

  useEffect(() => {
    updateEmployees()
  }, [])

  return (
    <Layout>
      <Typography variant="h1"  align="center">
        Welcome, admin!
      </Typography>

      <EmployeeList employees={employees} onChange={updateEmployees} />

    </Layout>
  )
}
