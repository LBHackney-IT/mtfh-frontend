import React from "react"

import { Link } from "../link"
import { SummaryList, SummaryListItem } from "./summary-list"

export default {
  title: "Summary List",
  component: SummaryList,
}

export const Base = () => {
  return (
    <SummaryList>
      <SummaryListItem title="Name">John Smith</SummaryListItem>
      <SummaryListItem title="Date of birth">12/08/1980</SummaryListItem>
    </SummaryList>
  )
}

export const SummaryListWithBorder = () => {
  return (
    <SummaryList variant="border">
      <SummaryListItem title="Name">John Smith</SummaryListItem>
      <SummaryListItem title="Date of birth">12/08/1980</SummaryListItem>
    </SummaryList>
  )
}

export const SummaryListWithActions = () => {
  return (
    <SummaryList variant="border" overrides={[1 / 2, 1 / 2]}>
      <SummaryListItem
        title="Name"
        actions={[
          <Link href="/edit">Edit</Link>,
          <Link as="button">Delete</Link>,
        ]}
      >
        John Smith
      </SummaryListItem>
      <SummaryListItem
        title="Date of birth"
        actions={[
          <Link href="/edit">Edit</Link>,
          <Link as="button">Delete</Link>,
        ]}
      >
        12/08/1980
      </SummaryListItem>
    </SummaryList>
  )
}

export const SummaryListWithOverrides = () => {
  return (
    <SummaryList variant="border" overrides={[1 / 2, 1 / 2]}>
      <SummaryListItem title="Name">John Smith</SummaryListItem>
      <SummaryListItem title="Date of birth">12/08/1980</SummaryListItem>
      <SummaryListItem title="Date of birth2">12/08/1981</SummaryListItem>
    </SummaryList>
  )
}
