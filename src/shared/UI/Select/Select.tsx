import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useMemo } from 'react';
import cls from './Select.module.scss';
import { Icon } from '../Icon/Icon';
import tick from '../../assets/icons/done-20-20.svg';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getSelectedArticleTypeOptions } from 'widgets/TextEditor/model/selectors/getTextEditorData';

export interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  subClass?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
  const dispatch = useAppDispatch();
  const selectedArticleTypeOptions = useSelector(getSelectedArticleTypeOptions);
  const { className, label, options, onChange, value, readonly, subClass } =
    props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const test = 'Future Frontenders';

  const optionsList = useMemo(
    () =>
      options?.map((opt) => {
        const isSelected = selectedArticleTypeOptions?.includes(opt.content);
        return (
          <option
            className={classNames(cls.option, {}, [subClass])}
            value={opt.value}
            key={opt.value}
          >
            {opt.content} {isSelected && '+'}
          </option>
        );
      }),
    [options],
  );

  const mods: Mods = {};

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && <span className={cls.label}>{`${label}`}</span>}
      <select
        disabled={readonly}
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  );
});
