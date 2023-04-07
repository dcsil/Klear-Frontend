import React from 'react'
import { type ImageStyle, Image } from "react-native"
import { domain } from "../apis/Headers"

interface incidentPictureProps {
  image?: string
  style?: ImageStyle
}

const url = `https://ik.imagekit.io/gglohtmqe/incidents/`
const thisIsWhatTheUrlShouldBe = "https://ik.imagekit.io/gglohtmqe/incidents/1.jpg"

export default function IncidentPicture({ image, style }: incidentPictureProps) {
  if (image) {
    return <Image
      style={[style]}
      source={{ uri: `${url}/${image}` }}
    />
  } else {
    return <Image source={require('../assets/klear_logo.png')} style={style} />
  }
}
