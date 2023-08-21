import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Textarea.module.scss';

interface TextareaProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  readonly?: boolean;
  placeholder?: string;
  name?: string;
}

const Textarea: React.FC<TextareaProps> = (props) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const {
    className,
    name,
    placeholder,
    value,
    readonly,
    onChange,
    autoFocus,
    ...otherProps
  } = props;

  return (
    <div className={classNames(cls.Textarea, {}, [className as string])}>
      {/* {@ts-ignore} */}
      <textarea
        placeholder={placeholder}
        className={cls.customTextarea}
        value={value}
        onChange={onChangeHandler}
        name={name}
      />
    </div>
  );
};

export default Textarea;
