import React, { memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PracticeCenter.module.scss';

interface PracticeCenterProps {
  className?: string;
}

const PracticeCenter: React.FC<PracticeCenterProps> = memo(({ className }) => {
  const [actions, setActions] = useState([
    '70 min running',
    '30 min workout',
    '7 min cold exposure',
    '400 squadz',
  ]);
  const [impacts, setimpacts] = useState([
    'D2 sensitivity +',
    'BDNF +',
    'Testosterone +',
    ,
  ]);

  return (
    <div className={classNames(cls.PracticeCenter, {}, [className as string])}>
      <div className={cls.account}>
        <div className={cls.pic}></div>
        <div className={cls.userData}>
          <h2>Mindsufer</h2>
          <span>level: 7</span>
        </div>
      </div>
      <div className={cls.impactBox}>
        <div className={cls.impactsTitle}>impacts</div>
        {impacts.map((imp) => {
          return <div className={cls.singleImpact}>{imp}</div>;
        })}
      </div>

      <div className={cls.actions}>
        <div className={cls.actionsTitle}>Actions</div>
        {actions.map((act) => {
          return <div className={cls.singleAction}>{act}</div>;
        })}
      </div>
    </div>
  );
});

export default PracticeCenter;
