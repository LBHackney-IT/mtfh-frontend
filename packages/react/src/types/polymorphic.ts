import type React from "react";

type IntrinsicProps<C extends React.ElementType> = React.ComponentPropsWithRef<C>;

type PropsWithAs<C extends React.ElementType, Props> = IntrinsicProps<C> &
  Props & { as?: C };

export type ForwardRefComponent<
  DefaultElement extends React.ElementType,
  Props extends object = object,
> = {
  <C extends React.ElementType = DefaultElement>(
    props: PropsWithAs<C, Props & { as?: C }>,
  ): React.ReactElement | null;
  displayName?: string;
};
