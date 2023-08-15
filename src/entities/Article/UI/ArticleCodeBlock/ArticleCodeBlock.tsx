import React, { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleCodeBlock.module.scss';
import { ArticleCodeBlockType } from 'entities/Article/types/article';
import { Code } from 'shared/UI/Code/Code';

interface ArticleCodeBlockProps {
  className?: string;
  block: ArticleCodeBlockType;
}

const ArticleCodeBlock: React.FC<ArticleCodeBlockProps> = (props) => {
  const { className, block } = props;

  return (
    <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
      <Code text={block.code} />
    </div>
  );
};

export default ArticleCodeBlock;
