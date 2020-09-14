/**
 * @file Card to handle assigning reviews
 * 
 * NOTE: We don't filter out employees because we assume that employees may
 * be requested to review other employees multiple times, or even to submit
 * reviews for themselves.
 */

import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  formControl: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-evenly',
    margin: theme.spacing(1),
    width: '100%',
  },
  select: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    flex: '4 1 auto',
  },
  assignButton: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}))

export default function AssignReviewCard ({ reviewer, employees, onSubmit }) {
  const classNames = useStyles()

  const [revieweeId, setRevieweeId] = useState('')

  const handleChange = event => {
    setRevieweeId(event.target.value)
  }

  const handleSubmit = async event => {
    const response = await fetch('/api/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reviewer_id: reviewer.id,
        reviewee_id: revieweeId,
      })
    })

    if (response.ok) {
      onSubmit()
    }
  }

  return (
    <FormControl className={classNames.formControl}>
      <InputLabel id="employee-select-label">Employee</InputLabel>
      <Select
        labelId="employee-select-label"
        id="employee-select"
        value={revieweeId}
        className={classNames.select}
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

      <Button
        className={classNames.assignButton}
        color="primary"
        variant="contained"
        onClick={handleSubmit}
      >
        Assign review
      </Button>
    </FormControl>
  )
}
