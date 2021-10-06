import React from "react";

import { Text } from "../text";
import { Link } from "./link";

export default {
  title: "Link",
  component: Link,
};

export const Base = () => {
  return <Link href="/">Home</Link>;
};

export const DangerLink = () => {
  return (
    <Link href="/delete" variant="danger">
      Delete Record
    </Link>
  );
};

export const MutedLink = () => {
  return (
    <Link href="/activities" variant="muted">
      Past activities
    </Link>
  );
};

export const TextColorLink = () => {
  return (
    <Text>
      Read more about{" "}
      <Link href="/mark" variant="text-colour">
        Mark
      </Link>{" "}
      in our new{" "}
      <Link href="/post/1" variant="text-colour">
        blog post
      </Link>
      .
    </Text>
  );
};

export const NoUnderlineLink = () => {
  return (
    <Link href="/" variant="no-underline">
      Home
    </Link>
  );
};

export const BackLink = () => {
  return (
    <Link href="/back" variant="back-link">
      Home
    </Link>
  );
};

export const ExternalLink = () => {
  return (
    <Link href="http://google.com" isExternal>
      Google
    </Link>
  );
};
