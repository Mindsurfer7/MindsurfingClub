import React, {
  ChangeEvent,
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLinputprops = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;

interface InputProps extends HTMLinputprops {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
}

const Input: React.FC<InputProps> = memo((props) => {
  const [isFocused, setFocus] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  const {
    className,
    placeholder,
    value,
    onChange,
    autoFocus,
    type = 'text',
    ...otherProps
  } = props;

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

  return (
    <div className={classNames(cls.InputWrapper, {}, [className as string])}>
      {placeholder && (
        <div className={cls.placeholder}>{placeholder + ' >'}</div>
      )}

      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          type={type}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          onChange={onChangeHandler}
          className={cls.input}
          {...otherProps}
        />
        {isFocused && (
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
