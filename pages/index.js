/**
 * @file The home page of the app
 */

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Layout from '../components/layout'

const useStyles = makeStyles((theme) => ({
  root: {
  },
}))

export default function Home() {
  const classNames = useStyles()

  return (
    <Layout>
      <div className={classNames.root}>
        <Typography variant="h1" align="center">
          Hello, there!
        </Typography>

        <Typography variant="body1" align="center" paragraph>
          Welcome to my implementation of the PayPay Full Stack Engineer Challenge.
          You'll find links to the admin and employee pages in the header up above.
          From the admin page, you'll be able to view all of the employee reviews,
          both pending and completed. You'll also be able to add, remove, or edit
          employees, as well as assign employees to write new reviews.
          I've already seeded the database with a small number of employees and
          reviews, so you should be able to check out all of the features without
          needing to do too much work.
          Enjoy!
        </Typography>

      </div>
    </Layout>
  )
}
