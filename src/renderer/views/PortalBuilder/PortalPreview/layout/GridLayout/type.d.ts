import { CSSProperties, ReactElement } from "react"

declare type GridBlock = {
  style?: CSSProperties
  content: ReactElement | string | number
  width: number
}

declare enum GridRowAlign {
  TOP = "top",
  MIDDLE = "middle",
  BOTTOM = "bottom"
}

declare enum GridRowJustify {
  START = "start",
  END = "end",
  CENTER = "center",
  SPACE_AROUND = "space-around",
  SPACE_BETWEEN = "space-between"
}

declare type GridRow = {
  blocks: GridBlock[]
  align?: GridRowAlign,
  justify?: GridRowJustify
}

declare type GridLayout = {
  rows: GridRow[]
}