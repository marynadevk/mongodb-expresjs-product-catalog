import React from 'react';
import './Input.css';

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>{
  label: string;
}

export const Textarea: React.FC<Props> = (props) => {
  
  return (
    <div className="input">
      <label>{props.label}</label>
      <textarea rows={5} {...props} onChange={props.onChange} />
    </div>
  );
};
