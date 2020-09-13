import Head from 'next/head'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import LinkWrapper from './linkWrapper'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: theme.palette.background.paper,
  },
  links: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '80%',
  },
  link: {
    color: theme.palette.text.primary,
  },
  mainContent: {
    width: '80%',
    margin: 'auto',
    padding: '10px',
  },
}))

export default function Layout ({ children }) {
  const classNames = useStyles()

  return (
    <div className={classNames.root}>
      <header className={classNames.header}>
        <Typography className={classNames.links} color="primary">
          <LinkWrapper className={classNames.link} href="/">Home</LinkWrapper>
          <LinkWrapper className={classNames.link} href="/admin">Admin Page</LinkWrapper>
          <LinkWrapper className={classNames.link} href="/employee">Employee Page</LinkWrapper>
        </Typography>
      </header>

      <Container className={classNames.mainContent}>
        {children}
      </Container>
    </div>
  )
}
