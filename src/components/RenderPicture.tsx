import React from 'react'
import { type ImageStyle, Image } from "react-native"

interface renderPictureProps {
  image?: string
  type?: 'incidents' | 'students'
  style?: ImageStyle
}

export default function RenderPicture({ image, style, type }: renderPictureProps) {
  if (image && type) {
    const url = `https://ik.imagekit.io/gglohtmqe/${type}/${image}`
    return <Image
      style={[style]}
      source={{ uri: url }}
      accessibilityLabel={image}
    />
  } else {
    return <Image source={require('../assets/klear_logo.png')} style={style} accessibilityLabel={image} />
  }
}
