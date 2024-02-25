import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleViewSelector.module.scss';
import { ArticleViewType } from 'entities/Article';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import ListIcon from 'shared/assets/icons/list-24-24.svg?react';
import TiledIcon from 'shared/assets/icons/tiled-24-24.svg?react';

interface ArticleViewSelectorProps {
  className?: string;
  view?: ArticleViewType;
  onViewClick: (view: ArticleViewType) => void;
}

const viewTypes = [
  {
    view: ArticleViewType.Rectangle,
    icon: ListIcon,
  },
  {
    view: ArticleViewType.Square,
    icon: TiledIcon,
  },
];

const ArticleViewSelector: React.FC<ArticleViewSelectorProps> = ({
  className,
  view,
  onViewClick,
}) => {
  const onClick = (newView: ArticleViewType) => {
    onViewClick?.(newView);
  };

  return (
    <div
      className={classNames(cls.ArticleViewSelector, {}, [className as string])}
    >
      {viewTypes.map((viewType) => {
        return (
          <Button
            key={viewType.view}
            theme={ButtonTheme.CLEAR}
            onClick={() => onClick(viewType.view)}
          >
            <Icon
              Svg={viewType.icon}
              className={classNames(
                cls.ArticleViewSelector,
                { [cls.notSelected]: viewType.view !== view },
                [className as string],
              )}
            />
          </Button>
        );
      })}
    </div>
  );
};

export default ArticleViewSelector;
