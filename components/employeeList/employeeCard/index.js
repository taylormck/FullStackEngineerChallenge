/**
 * @file Present a list of reviews for an employee
 */

import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';

import AssignReviewCard from './assignReviewCard'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around',
    margin: theme.spacing(1),
  },
  nameCard: {
    minWidth: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  deleteButton: {
    margin: theme.spacing(1)
  },
  reviewsContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    margin: theme.spacing(1),
  },
  reviewCard: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    maxWidth: '45%',
  },
  pendingReviewsContainer: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
  },
  assignReviewContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space evenly',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
}))

export default function EmployeeCard ({ employee, employees, onChange }) {
  const classNames = useStyles()

  const onDelete = async () => {
    console.log('Bye bye,', employee.name)
    const response = await fetch(`/api/employee/${employee.id}`, { method: 'DELETE' })

    if (response.ok) {
      onChange()
    }
  }

  return (
    <Card className={classNames.root} raised>
      <Card className={classNames.nameCard} raised>
        <Typography variant="h4" align="center">
          {employee.name}
        </Typography>

        <Button className={classNames.deleteButton} color="secondary" onClick={onDelete}>
          <DeleteIcon />
        </Button>
      </Card>
      
      <Typography variant="h6" align="center">
        Reviews
      </Typography>

      <Container className={classNames.reviewsContainer}>
        {employee.reviews.map((r, i) => (
          <Card key={`review-card-${i}`} className={classNames.reviewCard} raised>
            <Typography variant="body1">{r}</Typography>
          </Card>
        ))}
      </Container>

      <Typography variant="h6" align="center">
        Still needs to submit reviews for:
      </Typography>

      <Container className={classNames.pendingReviewsContainer}>
        {employee.pendingReviews.map(reviewee => (
          <Card
            key={`pending-review-${employee.id}-${reviewee.id}`}
            className={classNames.pendingReviewCard}
          >
            <Typography
              variant="body1"
              align="center"
              paragraph
            >
              {reviewee.name}
            </Typography>
          </Card>
        ))}
      </Container>

      <Container className={classNames.assignReviewContainer}>
        <AssignReviewCard
          reviewer={employee}
          employees={employees}
          onSubmit={onChange}
        />
      </Container>
    </Card>
  )
}
