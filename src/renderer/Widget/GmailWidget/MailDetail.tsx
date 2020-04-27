import React, {useContext, useEffect} from 'react';
import {Collapse} from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const MailDetail = ({data = '', onClose, mailDetail = '<html></html>'}: {
  data?: any;
  onClose?: () => void;
  mailDetail?: any;
}) => {

  return (
    <Collapse
      bordered={false}
      expandIcon={({isActive = false}) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      // className="site-collapse-custom-collapse"
    >
      <Panel header={data} key="1" className="site-collapse-custom-panel">
        hello
      </Panel>
    </Collapse>
  );
};

export default MailDetail;