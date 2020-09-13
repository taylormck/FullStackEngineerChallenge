/**
 * @file A wrapper around links to make Material-UI and Nextjs links play nice
 */

import Link from 'next/link'
import { Link as MaterialLink } from '@material-ui/core'

const LinkWrapper = ({ className, href, hrefAs, children }) => (
  <Link href={href} as ={hrefAs} passHref>
    <MaterialLink className={className}>
      {children}
    </MaterialLink>
  </Link>
)

export default LinkWrapper
