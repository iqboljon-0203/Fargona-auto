'use client'

import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'

interface NewsImageProps extends Omit<ImageProps, 'src'> {
  src: string | null | undefined
  fallbackSrc?: string
}

export default function NewsImage({ src, fallbackSrc = '/cars/tracker/tracker-uz.webp', alt, ...props }: NewsImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc)

  return (
    <Image
      src={imgSrc}
      alt={alt || 'Image'}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
      {...props}
    />
  )
}
