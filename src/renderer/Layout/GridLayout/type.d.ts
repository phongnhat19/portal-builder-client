declare type GridBlock = {
  style?: CSSProperties;
  content?: IframeWidgetProps | HTMLWidgetProps | SchedulerWidgetProps | AppSpaceWidgetProps;
  width: number;
  type?: ContentType;
}

declare enum GridRowAlign {
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom'
}

declare enum GridRowJustify {
  START = 'start',
  END = 'end',
  CENTER = 'center',
  SPACE_AROUND = 'space-around',
  SPACE_BETWEEN = 'space-between'
}

declare type GridRow = {
  blocks: GridBlock[];
  align?: GridRowAlign;
  justify?: GridRowJustify;
}

declare type GridLayout = {
  rows: GridRow[];
}