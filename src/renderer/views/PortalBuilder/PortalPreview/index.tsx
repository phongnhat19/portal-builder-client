import React from 'react';
import TabsLayout from '../../../Layout/TabsLayout';
import {LAYOUT_TYPE} from '../../../Layout/constant';
import GridLayout from '../../../Layout/GridLayout';

const PortalPreview = ({
  layout
}: {
  layout?: Layout;
}) => {

  const renderLayout = () => {
    if (layout!.type === LAYOUT_TYPE.TAB) {
      const props = layout!.props as TabLayout;
      return (
        <TabsLayout
          tabList={props.tabList}
        />
      );
    } else if (layout!.type === LAYOUT_TYPE.GRID) {
      const props = layout!.props as GridLayout;
      return (
        <GridLayout items={props.rows} />
      );
    }
  };

  return (
    <div style={{paddingTop: '30px'}}>
      {
        layout && renderLayout()
      }
    </div>
  );
};

export default PortalPreview;