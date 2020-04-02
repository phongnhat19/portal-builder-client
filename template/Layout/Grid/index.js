import { createIframeItemContent } from "../../Widget/Iframe";
import { createHTMLItemContent } from "../../Widget/HTML";
import { createScheduleWidget } from "../../Widget/Schedule";
import './style.css'

const createGridsLayout = (gridRows) => {
  const containerEl = document.createElement('div');
  containerEl.className = 'grid-layout'

  gridRows.forEach(row => {
    containerEl.appendChild(createGridRow(row.blocks))
  });

  return containerEl;
}

const createGridRow = (gridBlocks) => {
  const gridRow = document.createElement('div')
  gridRow.className = 'grid-row'

  gridBlocks.forEach(block => {
    gridRow.appendChild(createGridBlock(block))
  })

  return gridRow
}

const createGridBlock = (block) => {
  const gridBlock = document.createElement('div')
  gridBlock.className = 'grid-block'
  gridBlock.style.width = `${block.width}%`
  const blockContent = createBlockContent(block);
  gridBlock.appendChild(blockContent)

  return gridBlock
}

const createBlockContent = (block) => {
  let blockContentEl = document.createElement('div');
  let blockContent = document.createElement('div');
  blockContentEl.className = 'grid-block-content'

  switch (block.type) {
    case 'Iframe':
      if (!block.content) break;
      blockContent = createIframeItemContent(block.content);
      break;
    case 'HTML':
      blockContent = createHTMLItemContent(block.content);
      break;
    case 'Schedule':
      blockContent = createScheduleWidget(block.content);
      break;
    default:
      break;
  }

  blockContentEl.appendChild(blockContent)
  return blockContentEl;
}

export { createGridsLayout }