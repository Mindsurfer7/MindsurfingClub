type Mods = Record<string, boolean | string | undefined>;

export function classNames(
  cls: string,
  mods: Mods = {},
  add: string[] | undefined = []
): string {
  return [
    cls,
    ...add.filter(Boolean),
    ...Object.entries(mods)
      .filter(([cls, value]) => Boolean(value))
      .map(([cls, value]) => cls),
  ].join(" ");
}

//classNames("remove-btn", { hovered: true, selectable: true, red: true }, [""]);
