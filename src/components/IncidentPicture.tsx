import React from 'react'
import { type ImageStyle, Image } from "react-native"
import { domain } from "../apis/Headers"

interface incidentPictureProps {
  image?: string
  style?: ImageStyle
}

export default function IncidentPicture({ image, style }: incidentPictureProps) {
  if (image) {
    return <Image
      style={[style]}
      source={{ uri: `${domain}/images/${image}` }}
    />
  } else {
    return <Image source={require('../assets/klear_logo.png')} style={style} />
  }
}
