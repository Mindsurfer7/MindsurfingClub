import React, {
  ChangeEvent,
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLinputprops = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readonly'
>;

interface InputProps extends HTMLinputprops {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (e: any) => void;
  autoFocus?: boolean;
  readonly?: boolean;
}

const Input: React.FC<InputProps> = memo((props) => {
  const [isFocused, setFocus] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  const {
    className,
    placeholder,
    value,
    readonly,
    onChange,
    autoFocus,
    onKeyDown,
    type = 'text',
    ...otherProps
  } = props;

  const isCaretVisible = isFocused && !readonly;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length);
  };

  useEffect(() => {
    if (autoFocus) {
      setFocus(true);
      ref.current?.focus();
    }
  }, [autoFocus]);

  const onBlur = () => {
    setFocus(false);
  };

  const onFocus = () => {
    setFocus(true);
  };

  const onSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0);
  };

  const mods: Mods = {
    [cls.readonly]: readonly,
  };

  return (
    <div className={classNames(cls.InputWrapper, mods, [className as string])}>
      {placeholder && (
        <div className={cls.placeholder}>{placeholder + ' >'}</div>
      )}

      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          type={type}
          value={value}
          onFocus={onFocus}
          readOnly={readonly}
          onBlur={onBlur}
          onSelect={onSelect}
          onChange={onChangeHandler}
          onKeyDown={onKeyDown}
          className={cls.input}
          {...otherProps}
        />
        {isCaretVisible && (
          <span
            style={{ left: `${caretPosition * 8}px` }}
            className={cls.caret}
          ></span>
        )}
      </div>
    </div>
  );
});

export default Input;
