import React, {useState} from 'react';
import {SCHEDULER_VIEW} from './constant';
import SettingsWidget from '../components/Settings';
import ScheduleModal from './ScheduleModal';
import Schedule from './renderer';

const SchedulerWidget = ({onSaveSetting, width, height, defaultView = SCHEDULER_VIEW.FULL_CALENDAR_DAY_TIME, onRemove, showSettingInit = false}: {
  defaultView?: string;
  onRemove?: () => void;
  showSettingInit?: boolean;
  width?: string | number;
  height?: string | number;
  onSaveSetting?: ({defaultView}: { defaultView: string }) => void;
}) => {

  const [showSetting, setShowSetting] = useState(showSettingInit);
  const [typeView, setTypeView] = useState(defaultView);

  const start = new Date();
  start.setHours(9);

  const end = new Date();
  end.setHours(11);

  return (
    <div style={{width, height, position: 'relative'}}>
      <SettingsWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} className="scheduler-settings-button" />
      <Schedule
        defaultView={typeView}
        data={[
          {
            id: '1',
            allDay: false,
            title: 'SAMPLE EVENT',
            start,
            end
          }
        ]}
      />
      <ScheduleModal
        defaultView={typeView}
        isVisible={showSetting}
        onClose={() => (setShowSetting(false))}
        onSave={(item) => {
          setTypeView(item.defaultView);
          onSaveSetting && onSaveSetting({defaultView: item.defaultView});
          setShowSetting(false);
        }}
      />
    </div>
  );
};

export default SchedulerWidget;