import React, {useContext, useEffect} from 'react';
import {Collapse} from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const MailDetail = ({isVisible = false, onClose, mailDetail = '<html></html>'}: {
  isVisible?: boolean;
  onClose?: () => void;
  mailDetail?: any;
}) => {

  return (
    <Collapse
      bordered={false}
      expandIcon={({isActive = false}) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      // className="site-collapse-custom-collapse"
    >
      <Panel header="This is panel header 1" key="1" className="site-collapse-custom-panel">
        hello
      </Panel>
    </Collapse>
  );
};

export default MailDetail;