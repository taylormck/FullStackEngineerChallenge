/**
 * @file Present a list of reviews for an employee
 */

import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import EmployeeCard from './employeeCard'
import CreateEmployeeCard from './createEmployeeCard'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  cardContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
    padding: theme.spacing(2),
  },
}))

export default function EmployeeList ({ employees, onChange }) {
  const classNames = useStyles()

  const cards = employees.map(e => (
    <EmployeeCard key={e.id} employee={e} employees={employees} onChange={onChange} />
  ))

  cards.push(
    <CreateEmployeeCard
      key="create-employee-card"
      onSubmit={onChange}
    />
  )

  return (
    <div className={classNames.root}>
      <Typography variant="h2" align="center">
        Employee Info
      </Typography>
      
      <Container className={classNames.cardContainer}>
        {cards}
      </Container>
    </div>
  )
}
