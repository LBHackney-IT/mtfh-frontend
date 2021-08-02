import React from "react";

import { Center } from "../center";
import { Link } from "../link";
import { LinkBox, LinkOverlay } from "./link-box";

export default {
  title: "LinkBox",
  component: LinkBox,
};

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
      <Center style={{ height: "100%" }}>
        <LinkOverlay>
          <Link href="/">Link</Link>
        </LinkOverlay>
      </Center>
    </LinkBox>
  );
};
