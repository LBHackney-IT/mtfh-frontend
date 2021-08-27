import React from "react"

import { Panel } from "./panel"

export default {
  title: "Panel",
  component: Panel,
}

export const Base = () => <Panel titleText="Application complete" />
export const WithBodyText = () => (
  <Panel
    titleText="Application complete"
    bodyText="Your reference number: HDJ2123F"
  />
)
export const WithSuccessIcon = () => (
  <Panel
    titleText="Application complete"
    bodyText="Your reference number: HDJ2123F"
    variant="success"
  />
)
export const WithErrorIcon = () => (
  <Panel
    titleText="Application incomplete"
    bodyText="You need to fill more details"
    variant="error"
  />
)
