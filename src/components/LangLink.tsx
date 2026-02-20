'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { ComponentProps } from 'react'

type LangLinkProps = ComponentProps<typeof Link>

export default function LangLink({ href, ...props }: LangLinkProps) {
  const params = useParams()
  const lang = (params?.lang as string) || 'uz'

  // Don't modify external links, anchors, or tel/mailto
  const hrefStr = typeof href === 'string' ? href : href.pathname || ''
  
  if (
    hrefStr.startsWith('#') ||
    hrefStr.startsWith('http') ||
    hrefStr.startsWith('tel:') ||
    hrefStr.startsWith('mailto:')
  ) {
    return <Link href={href} {...props} />
  }

  // Already has lang prefix
  if (hrefStr.startsWith(`/${lang}`)) {
    return <Link href={href} {...props} />
  }

  // Prepend lang
  const localizedHref = `/${lang}${hrefStr.startsWith('/') ? '' : '/'}${hrefStr}`
  return <Link href={localizedHref} {...props} />
}
