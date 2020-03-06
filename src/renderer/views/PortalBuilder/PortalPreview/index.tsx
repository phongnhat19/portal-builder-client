import React from 'react'
import TabsLayout from './layout/TabsLayout'
const PortalPreview = () => {
  return(
    <div style={{display: 'flex', justifyContent:'center', paddingTop: '30px'}}>
      <TabsLayout 
        items={[
          {
            tabName: 'Company Location',
            tabContent: {
              type: 'Widget',
              name: 'Iframe',
              props: {
                url: 'https://www.google.com/maps/embed/v1/place?key=AIzaSyC6NGlXCyiz7CbeJAb1RA6bUsWN6YWaK8Q&q=Centre+Point+Tower',
                width: '100%',
                height: '600px'
              }
            }
          },
          {
            tabName: 'My Schedule',
            tabContent: {
              type: 'Widget',
              name: 'IframeWidget',
              props: {
                url: 'https://nhat-nguyen.kintone-dev.com/g/schedule/index.csp?&gid=login',
                width: '100%',
                height: '600px'
              }
            }
          },
          {
            tabName: 'Default Portal',
            tabContent: {
              type: 'Widget',
              name: 'DefaultPortal'
            }
          }
        ]}
      />
    </div>
  )
}

export default PortalPreview