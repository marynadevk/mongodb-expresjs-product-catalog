import React, { useState } from 'react';
import './AuthPage.css';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { IAuthData } from '../../types/IAuthData';
import { useParams } from 'react-router-dom';

type Props = {
  onAuthModeChange: () => void;
  onAuth: (event: React.FormEvent, authData: { email: string; password: string }) => void;
  mode: 'login' | 'signup';
};

export const AuthPage: React.FC<Props> = ({ onAuthModeChange, onAuth }) => {
  const [authData, setAuthData] = useState<IAuthData>({ email: '', password: '' });
  const { mode } = useParams();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, input: string) => {
    const updatedAuthData = {
      ...authData,
      [input]: event.target.value,
    };
    setAuthData(updatedAuthData);
  };

  let modeButtonText = 'Switch to Signup';
  let submitButtonText = 'Login';

  if (mode === 'signup') {
    modeButtonText = 'Switch to Login';
    submitButtonText = 'Signup';
  };

    return (
      <main>
        <section className="auth__mode-control">
          <Button type="button" onClick={onAuthModeChange}>
            {modeButtonText}
          </Button>
        </section>
        <form
          className="auth__form"
          onSubmit={event =>
            onAuth(event, {
              email: authData.email,
              password: authData.password
            })
          }
        >
          <Input
            label="E-Mail"
            type="email"
            value={authData.email}
            onChange={(event) => inputChangeHandler(event, 'email')}
          />
          <Input
            label="Password"
            type="password"
            value={authData.password}
            onChange={(event) => inputChangeHandler(event, 'password')}
          />
          <Button type="submit">{submitButtonText}</Button>
        </form>
      </main>
    );
  };
