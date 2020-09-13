/**
 * @file The page for standard employees
 */

import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import Layout from '../components/layout'
import LinkWrapper from '../components/linkWrapper'

import { getEmployees } from '../service/employee'


const useStyles = makeStyles((theme) => ({
  select: {
    display: 'flex',
    flexFlow: 'row nowrap',
    width: '100%',
    padding: 20,
  },
  formControl: {
    width: '80%',
    margin: 'auto',
  },
  employeeInfo: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    padding: 20,
  },
}))

export default function Employee({ employees }) {
  const classNames = useStyles()

  const [employee, setEmployee] = useState({
    id: '',
    name: '',
  })

  const handleChange = async event => {
    const newEmployeeId = event.target.value
    const response = await fetch(`/api/employee/${newEmployeeId}`)

    if (response.ok) {
      const newEmployeeData = await response.json()

      setEmployee(newEmployeeData)
    }
  }

  return (
    <Layout>
      <Typography variant="body1" align="center">
        Please choose an employee.
      </Typography>

      <Container className={classNames.select}>
        <FormControl className={classNames.formControl}>
          <InputLabel id="employee-select-label">Employee</InputLabel>
          <Select
            labelId="employee-select-label"
            id="employee-select"
            value={employee.id}
            onChange={handleChange}
          >
            {employees.map(e => (
              <MenuItem
                key={e.id}
                value={e.id}
              >
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Button variant="contained" color="primary">
          Go!
        </Button>
      </Container>

      <Container className={classNames.employeeInfo}>
        <Typography variant="body1">Name: {employee.name}</Typography>
      </Container>
    </Layout>
  )
}

export async function getStaticProps (ctx) {
  const employees = await getEmployees()

  return {
    props: {
      employees
    }
  }
}
