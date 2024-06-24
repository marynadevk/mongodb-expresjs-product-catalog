import React from 'react';
import './Input.css';

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  label: string;
}

export const Input: React.FC<Props> = (props) => {
  return (
    <div className="input">
      <label>{props.label}</label>
      <input {...props} onChange={props.onChange} />
    </div>
  );
};
