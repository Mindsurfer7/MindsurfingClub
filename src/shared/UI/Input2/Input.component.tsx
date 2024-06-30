import React, { ChangeEvent, useState } from 'react';
import styles from './input.module.scss';
import { InputType } from 'zlib';
import clsx from 'clsx';

export enum InputTheme {
  default = 'default',
}

export interface InputProps {
  // extends React.InputHTMLAttributes<HTMLInputElement> {
  //<T extends InputType> {
  className?: string;
  error?: string | boolean;
  checked?: boolean;
  type: 'text' | 'password' | 'email' | 'number' | 'date' | 'checkbox' | 'tel';
  value: any;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  theme?: keyof typeof InputTheme;
  onFocusChange?: (isFocused: boolean) => void;
}

const InputRound = (props: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    placeholder,
    value,
    onChange,
    type,
    error,
    checked,
    className,
    theme = 'default',
    disabled,
  } = props;
  const isNotEmpty = value !== '';
  const isEmpty = value === '';

  const handleFocus = (focused: boolean) => {
    setIsFocused(focused);
    if (props.onFocusChange) {
      props.onFocusChange(focused);
    }
  };

  return (
    <div className={styles['input-wrapper']}>
      <input
        onFocus={() => handleFocus(true)}
        onBlur={() => setIsFocused(false)}
        checked={checked}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        value={value}
        onChange={onChange}
        className={clsx([
          styles[`input-wrapper-${theme}`],
          error && styles['input-wrapper-input-error'],
          className,
        ])}
        disabled={disabled}
      />
      {/* {type === "password" &&
        (!showPassword ? (
          <Image
            src="/icons/eyeClosed.svg"
            className={styles["input-wrapper-svg"]}
            alt="icon"
            width={20}
            height={20}
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <Image
            src="/icons/eyeOpened.svg"
            className={styles["input-wrapper-svg"]}
            alt="icon"
            width={20}
            height={20}
            onClick={() => setShowPassword(!showPassword)}
          />
        ))} */}
      <label
        className={clsx([
          styles['input-wrapper-label-placeholder'],
          (isFocused || isNotEmpty) && styles['input-wrapper-not-empty'],
          (isFocused || isNotEmpty) && styles['input-wrapper-focus'],
          !isFocused && styles['input-wrapper-not-focused'],
          error && styles['input-wrapper-placeholder-red'],
        ])}
      >
        {placeholder}
      </label>
      {error !== '' && (
        <span className={styles['input-wrapper-error-message']}>{error}</span>
      )}
    </div>
  );
};

export default InputRound;
