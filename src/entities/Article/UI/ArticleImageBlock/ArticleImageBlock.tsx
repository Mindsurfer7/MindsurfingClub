import React, { FC, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleImageBlock.module.scss';
import { ArticleImageBlockType } from 'entities/Article/types/article';
import Text, { TextAlign } from 'shared/UI/Text/Text';

interface ArticleCodeBlockProps {
  className?: string;
  block: ArticleImageBlockType;
}

const ArticleImageBlock: React.FC<ArticleCodeBlockProps> = (props) => {
  const { className, block } = props;
  return (
    <div
      className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
    >
      <img src={block.src} alt={block.title} className={cls.img} />
      {block.title && <Text text={block.title} align={TextAlign.Center} />}
    </div>
  );
};

export default ArticleImageBlock;
