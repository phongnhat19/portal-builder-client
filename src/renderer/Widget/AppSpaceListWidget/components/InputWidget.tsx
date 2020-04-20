import React from 'react'
import {Input} from 'antd';

export const InputText = ({
  label,
  width,
  value,
  placeholder,
  type,
  onChange,
  className
}: {
  label: string;
  width: string;
  value: string;
  placeholder: string;
  type: string;
  className:string;
  onChange: (value: string | number) => void;
}) => {
  return (
    <div className={`item-block ` + className}  style={{width}}>
      <strong>{label}</strong>
      <Input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};