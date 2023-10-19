import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleTextBlock.module.scss';
import { ArticleTextBlockType } from 'entities/Article/types/article';
import Text from 'shared/UI/Text/Text';

interface ArticleCodeBlockProps {
  className?: string;
  block: ArticleTextBlockType;
}

const ArticleTextBlock: React.FC<ArticleCodeBlockProps> = memo((props) => {
  const { className, block } = props;

  return (
    <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
      {block.title && <Text title={block.title} className={cls.title} />}
      {block.paragraphs.map((paragraph, index) => (
        // <Text key={paragraph} text={paragraph} className={cls.paragraph} />
        <div dangerouslySetInnerHTML={{ __html: paragraph }} />
      ))}
    </div>
  );
});

export default ArticleTextBlock;
