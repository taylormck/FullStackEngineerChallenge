/**
 * @file Present a list of reviews for an employee
 */

import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around',
    margin: theme.spacing(1),
  },
  labelCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '0 4 auto',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  createEmployeeNameCard: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  createEmployeeName: {
    display: 'flex',
    flex: '4 0 auto',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  createEmployeeButton: {
    display: 'flex',
    flex: '1 4 auto',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
}))

export default function CreateEmployeeCard ({ onSubmit }) {
  const classNames = useStyles()

  const [name, setName] = useState('')

  const handleChange = event => {
    setName(event.target.value)
  }

  const handleSubmit = async () => {
    if (name === '') {
      return
    }

    const response = await fetch('/api/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    })

    if (response.ok) {
      setName('')
      await onSubmit()
    }
  }

  return (
    <Card className={classNames.root}>
      <Card className={classNames.labelCard}>
        <Typography variant="h6" align="center">
          Create new employee:
        </Typography>
      </Card>

      <Card className={classNames.createEmployeeNameCard} variant="outlined">
          <TextField
            id="create-new-user-name"
            label={`Create New User`}
            multiline
            rows={4}
            className={classNames.createEmployeeName}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            className={classNames.createEmployeeButton}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Card>
    </Card>
  )
}
