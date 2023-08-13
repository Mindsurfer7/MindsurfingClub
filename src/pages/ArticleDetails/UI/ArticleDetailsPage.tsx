import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import SingleArticle from 'entities/Article/UI/SingleArticle/UI/SingleArticle';
import { useParams } from 'react-router-dom';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage: React.FC<ArticleDetailsPageProps> = ({
  className,
}) => {
  const { articleID } = useParams<{ articleID: string }>();

  // if (!articleID) {
  //   return (
  //     <div
  //       className={classNames(cls.ArticleDetailsPage, {}, [
  //         className as string,
  //       ])}
  //     >
  //       Sorry, but article wasnt found
  //     </div>
  //   );
  // }

  return (
    <div
      className={classNames(cls.ArticleDetailsPage, {}, [className as string])}
    >
      <SingleArticle ID={'1'} />
    </div>
  );
};

export default ArticleDetailsPage;
