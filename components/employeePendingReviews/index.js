/**
 * @file Present a list of pending reviews for an employee
 */

import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'

import PendingReviewCard from './pendingReviewCard'

const useStyles = makeStyles(theme => ({
  pendingReviewsContainer: {
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: 20,
  },
}))

export default function EmployeePendingReviews ({ employee }) {
  const classNames = useStyles()

  const [pendingReviews, setPendingReviews] = useState([])

  const fetchPendingReviews = async () => {
    const response = await fetch(`/api/employee/${employee.id}/pendingReviews`)

    if (response.ok) {
      const reviews = await response.json()
      setPendingReviews(reviews)
    }
  }

  useEffect(() => { fetchPendingReviews() }, [employee.id])

  if (pendingReviews.length <= 0) {
    return (
      <Typography variant="h2" align="center">
        {employee.name} is all done with reviews!
      </Typography>
    )
  }

  return (
    <div>
      <Typography variant="h2" align="center">
        Reviews that {employee.name} still needs to do
      </Typography>

      <Container className={classNames.pendingReviewsContainer}>
        {pendingReviews.map((reviewee => (
          <PendingReviewCard
            key={`pending-review-card-${employee.id}-${reviewee.id}`}
            reviewer={employee}
            reviewee={reviewee}
            onSubmit={fetchPendingReviews}
          />
        )))}
      </Container>
    </div>
  )
}
