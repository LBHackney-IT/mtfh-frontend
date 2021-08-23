import React from "react"

import { Label } from "./label"

export default {
  title: "Label",
  component: Label,
}

export const Base = () => {
  return <Label htmlFor="test">A descriptive label</Label>
}

export const PolymorphicLabel = () => {
  return <Label as="p">A descriptive label</Label>
}
