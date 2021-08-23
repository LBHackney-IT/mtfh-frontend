import React from "react"

import { Center } from "../center"
import { Link } from "../link"
import { LinkBox, LinkOverlay } from "./link-box"

export default {
  title: "LinkBox",
  component: LinkBox,
}

export const Base = () => {
  return (
    <LinkBox
      style={{
        border: "2px solid grey",
        borderRadius: "6px",
        width: "200px",
        height: "200px",
      }}
    >
      <Center style={{ height: "100%", width: "100%" }}>
        <LinkOverlay as="span">
          <Link href="#main">Main</Link>
        </LinkOverlay>
        <Link href="#second" style={{ marginTop: 0, marginLeft: "10px" }}>
          Secondary
        </Link>
      </Center>
    </LinkBox>
  )
}
