export const createBoundElements = <
  S extends keyof JSX.IntrinsicElements,
  T extends keyof JSX.IntrinsicElements,
>(
  id: string,
  Source: S,
  Target: T,
) => {
  return [
    (props: JSX.IntrinsicElements[S]) => (
      <Source {...(props as any)} hx-target={`#${id}`} />
    ),
    (props: JSX.IntrinsicElements[T]) => <Target {...(props as any)} id={id} />,
  ] as const;
};
