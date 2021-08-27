import React from "react"

import { Panel } from "./panel"

export default {
  title: "Panel",
  component: Panel,
}

export const Base = () => <Panel titleText="Application complete" />
export const WithTitleAndBody = () => (
  <Panel
    titleText="Application complete"
    bodyText="Your reference number: HDJ2123F"
  />
)
export const WithTitle = () => <Panel titleText="Application complete" />
export const WithBody = () => (
  <Panel bodyText="Your reference number: HDJ2123F" />
)
