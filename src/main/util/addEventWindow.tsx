import React, {useEffect} from 'react';

export const customeAddEventWindow = (listener: string, ref: React.RefObject<HTMLDivElement>, callBack: () => void) => {
  const handleEvent = () => {
    if (ref.current) {
      callBack();
    }
  };
  useEffect(() => {
    document.addEventListener(listener, handleEvent);
    return () => {
      document.removeEventListener(listener, handleEvent);
    };
  });
};
