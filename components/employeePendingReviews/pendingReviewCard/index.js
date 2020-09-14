/**
 * @file Present a list of pending reviews for an employee
 */

import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  pendingReview: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    minHeight: 100,
  },
  pendingReviewNameCard: {
    minWidth: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 15,
  },
  pendingReviewTextCard: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    width: '100%',
    margin: 15,
  },
  pendingReviewText: {
    width: '100%',
  },
}))

export default function EmployeePendingReviews ({ reviewer, reviewee, onSubmit }) {
  const classNames = useStyles()

  const [text, setText] = useState()

  const handleChange = event => {
    const newText = event.target.value
    setText(newText)
  }

  const handleSubmit = async () => {
    const response = await fetch('/api/review', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reviewer_id: reviewer.id,
        reviewee_id: reviewee.id,
        content: text,
      })
    })

    if (response.ok) {
      await onSubmit()
    }
  }

  return (
    <div>
      <Card className={classNames.pendingReview} variant="outlined">
        <Card className={classNames.pendingReviewNameCard} variant="outlined">
          <Typography variant="h4" align="center">{reviewee.name}</Typography>
        </Card>

        <Card className={classNames.pendingReviewTextCard} variant="outlined">
          <TextField
            id={`review-text-${reviewee.id}`}
            label={`Review ${reviewee.name}`}
            multiline
            rows={4}
            className={classNames.pendingReviewText}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Card>
      </Card>
    </div>
  )
}
