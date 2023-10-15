import React, {
  ChangeEvent,
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './CustomInput.module.scss';

type HTMLinputprops = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readonly'
>;

interface InputProps extends HTMLinputprops {
  className?: string;
  value?: string;
  onChange?: (value: string, index?: number) => void;
  onKeyDown?: (e: any) => void;
  autoFocus?: boolean;
  readonly?: boolean;
  DatePicker?: boolean;
  textInput?: boolean;
  numberInput?: boolean;
}

const CustomInput: React.FC<InputProps> = memo((props) => {
  const [isFocused, setFocus] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const {
    className,
    placeholder,
    value,
    name,
    DatePicker,
    readonly,
    textInput,
    numberInput,
    onChange,
    autoFocus,
    onKeyDown,
    type = 'text',
    ...otherProps
  } = props;

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number,
  ) => {
    onChange?.(e.target.value, index);
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

  const mods: Mods = {
    [cls.readonly]: readonly,
    [cls.DatePicker]: DatePicker,
    [cls.textInput]: textInput,
    [cls.numberInput]: numberInput,
    [cls.offPlaceholder]: value || type === 'date',
  };

  return (
    <div className={classNames(cls.InputWrapper, mods)}>
      <input
        ref={ref}
        type={type}
        value={value}
        onFocus={onFocus}
        readOnly={readonly}
        onBlur={onBlur}
        onChange={onChangeHandler}
        onKeyDown={onKeyDown}
        className={classNames(cls.input, mods, [className as string])}
        //placeholder={placeholder}
        name={name}
      />
      <span
        className={classNames(cls.placeholder, mods, [className as string])}
      >
        {placeholder}
      </span>
    </div>
  );
});

export default CustomInput;
