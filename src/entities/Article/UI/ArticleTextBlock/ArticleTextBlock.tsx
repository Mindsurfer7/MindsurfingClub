import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleTextBlock.module.scss';

interface ArticleTextBlockProps {
  className?: string;
}

const ArticleTextBlock: React.FC<ArticleTextBlockProps> = ({ className }) => {
  return (
    <div
      className={classNames(cls.ArticleTextBlock, {}, [className as string])}
    ></div>
  );
};

export default ArticleTextBlock;
