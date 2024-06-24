import React from 'react';
import './Backdrop.css';

type Props = {
  show: boolean;
};

export const Backdrop: React.FC<Props> = ({ show }) => 
<div className={show ? 'backdrop show' : 'backdrop'} />;
