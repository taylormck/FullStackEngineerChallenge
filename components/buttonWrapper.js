/**
 * @file A wrapper around links to make Material-UI and Nextjs links play nice
 */

import Link from 'next/link'
import Button from '@material-ui/core/Button'

const ButtonWrapper = ({ className, href, hrefAs, variant, color, children }) => (
  <Link href={href} as={hrefAs} passHref>
    <Button className={className} variant={variant} color={color}>
      {children}
    </Button>
  </Link>
)

export default ButtonWrapper
