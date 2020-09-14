/**
 * @file Present a list of reviews for an employee
 */

import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  cardContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  card: {
    display: 'flex',
    minHeight: 100,
    minWidth: '20%',
    maxWidth: '45%',
    margin: 15,
    padding:15,
  },
}))

export default function EmployeeReviews ({ employee }) {
  const classNames = useStyles()

  const [completedReviews, setCompletedReviews] = useState([])

  const fetchCompletedReviews = async () => {
    const response = await fetch(`/api/employee/${employee.id}/reviews`)

    if (response.ok) {
      const reviews = await response.json()
      setCompletedReviews(reviews)
    }
  }

  useEffect(() => { fetchCompletedReviews() }, [employee.id])

  return (
    <div className={classNames.root}>
      <Typography variant="h2" align="center">
        Reviews for {employee.name}
      </Typography>
      
      <Container className={classNames.cardContainer}>

        {completedReviews.map(((content, i) => (
          <Card
            className={classNames.card}
            variant="outlined"
            key={`completed-review-${i}`}
           >
            <Typography variant="body2">
              {content}
            </Typography>
          </Card>
        )))}

      </Container>
    </div>
  )
}
