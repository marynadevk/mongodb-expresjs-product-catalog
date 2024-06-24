import React from 'react';

import './Modal.css';
import { Button } from '../Button/Button';

type Props = {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    setIsOpen: (isOpen: boolean) => void;
};

export const Modal: React.FC<Props> = ({ isOpen, setIsOpen, title, children }) => (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
        <header className="modal__header">
            <h1>{title}</h1>
        </header>
        <section className="modal__content">
            {children}
        </section>
        <section className="modal__actions">
            <Button type="button" onClick={() => setIsOpen(false)}>Okay</Button>
        </section>
    </div>
);
