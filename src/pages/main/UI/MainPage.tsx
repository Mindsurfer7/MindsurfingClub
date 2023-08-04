import LoginForm from 'features/AuthByUsername/UI/LoginForm/LoginForm';
import { useTranslation } from 'react-i18next';

import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './MainPage.module.scss';
import Textarea from 'shared/UI/Textarea/Textarea';

interface MainPageProps {
  className?: string;
}

const MainPage: React.FC<MainPageProps> = memo(({ className }) => {
  const { t } = useTranslation('main');
  return (
    <div className={classNames(cls.MainPage, {}, [className as string])}>
      <div>
        'Зачем нужна геймификация жизненных целей и привычек? зачем нужен мув ту
        ерн? кому выгодно чтоб я больше двигался и был здоровым? никому. нужно
        тебе, если ты это осознаешь. но если не имеешь внутренней мотивации,
        можно продать тебе внешнюю. ну для альтруистов в принципе выгодно чтоб
        все ходили и были здоровыми умными богатыми и тд, поэтому нам надо
        создавать такие проекты в будущем, которые объединяют в себе и
        внутреннюю мотивацию, и внешнюю, чтобы можно было и монетизировать, и
        получать well-being profit база знаний цифровая гигиена: чб экран,
        удаление иконок навыки сохранения нейроресурса'
      </div>
      <Textarea />
    </div>
  );
});

export default MainPage;
