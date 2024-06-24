import React from 'react';
import './Button.css';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{}

export const Button: React.FC<Props> = (props) => 
<button className="button" {...props}>{props.children}</button>;
