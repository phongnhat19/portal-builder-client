import React from 'react';
import {Input} from 'antd';

export const InputWithLabel = ({
  label,
  width,
  value,
  placeholder,
  type,
  onChange,
  className,
  disabled
}: {
  label: string;
  width: string;
  value: string;
  placeholder: string;
  type: string;
  className: string;
  disabled?: boolean;
  onChange: (value: string | number) => void;
}) => {
  return (
    <div className={`item-block ${className}`} style={{width}}>
      <strong>{label}</strong>
      <Input type={type} placeholder={placeholder} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};