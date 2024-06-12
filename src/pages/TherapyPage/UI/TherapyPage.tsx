import React, { ChangeEvent, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TherapyPage.module.scss';
import InputRound from 'shared/UI/Input2/Input.component';
import Button from 'shared/UI/Button/Button';
import { useSelector } from 'react-redux';
import {
  getAdaptiveInput,
  getBeliefAnalisis,
  getDysfunctionalInput,
  getStrategy,
  getTherapyPageIsLoading,
} from '../model/selectors/getTherapyState';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import {
  setAdaptiveInput,
  setDysfunctionalInput,
  setStrategyInput,
} from '../model/slice/therapyPageSlice';
import { getBeliefsList } from '../model/services/getBeliefsList';
import { createNewBelief } from '../model/services/createNewBelief';
import { v4 } from 'uuid';
import { sendMessageToGPT } from 'entities/GPT';
import Preloader from 'shared/UI/Preloader/Preloader';
import { useDebounce } from 'shared/lib/hooks/useDebounce';

const systemMsg = {
  role: 'system',
  content:
    "Это системное сообщение предназначено для вашей поддержки в процессе рефрейминга дисфункциональных убеждений. Ваша задача - анализировать негативные убеждения, которые могут быть препятствием для клиентов, и предлагать адаптивные альтернативы, которые способствуют их благополучию и саморазвитию. При рефрейминге убеждения необходимо изменить его толкование таким образом, чтобы оно стало более позитивным, поддерживающим и мотивирующим для клиента. Например, дисфункциональное убеждение 'Я никогда не смогу добиться успеха' может быть трансформировано в адаптивное убеждение 'Каждая неудача - это возможность для личного роста и самосовершенствования'. Основная цель рефрейминга - помочь клиентам увидеть свои жизненные ситуации с новой, более позитивной перспективой, что способствует их психологическому благополучию и успешному функционированию в повседневной жизни. Только очень очень кратко. Твоя задача кратко предложить инверсию дисфункционального убеждения",
};
const systemMsgStrategy = {
  role: 'system',
  content:
    "Это системное сообщение предназначено для вашей поддержки в процессе рефрейминга дисфункциональных убеждений. Ваша задача - анализировать негативные убеждения, которые могут быть препятствием для клиентов, и предлагать адаптивные альтернативы, которые способствуют их благополучию и саморазвитию. При рефрейминге убеждения необходимо изменить его толкование таким образом, чтобы оно стало более позитивным, поддерживающим и мотивирующим для клиента. Например, дисфункциональное убеждение 'Я никогда не смогу добиться успеха' может быть трансформировано в адаптивное убеждение 'Каждая неудача - это возможность для личного роста и самосовершенствования'. Основная цель рефрейминга - помочь клиентам увидеть свои жизненные ситуации с новой, более позитивной перспективой, что способствует их психологическому благополучию и успешному функционированию в повседневной жизни. Только очень очень кратко. Твоя задача кратко предложить поведенческую стратегию которая будет подкреплять новое адаптивное убеждение которое клиент только что сформулировал. Необходимо закончить свой ответ кратким предложением ",
};

interface TherapyPageProps {
  className?: string;
}

// я хочу чтобы когда я добавляю новое дисф убеждение, то у меня была кнопка для того чтобы
// ии начал анализировать успешность этого рефрейминга

// создавть докусент с моим юзер айди и в нем создать белиф лист

// когда? как часто? в каком контексте? с какимми эмоциями?

const TherapyPage: React.FC<TherapyPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getTherapyPageIsLoading);
  const disfunctional = useSelector(getDysfunctionalInput);
  const adaptive = useSelector(getAdaptiveInput);
  const advice = useSelector(getBeliefAnalisis);
  const strategy = useSelector(getStrategy);

  const onDisInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDysfunctionalInput(e.target.value));
  };
  const onAdaptiveInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAdaptiveInput(e.target.value));
  };
  const onStrategyInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setStrategyInput(e.target.value));
  };

  useEffect(() => {
    dispatch(getBeliefsList());
  }, []);

  const onReframeClick = () => {
    dispatch(
      createNewBelief({
        adaptive: '',
        dysfunctional: disfunctional,
        id: v4(),
      }),
    );
  };

  const handleAnalizeBelief = () => {
    dispatch(
      sendMessageToGPT([
        systemMsg,
        {
          role: 'user',
          content: disfunctional,
        },
      ]),
    );
  };
  const handleAnalizeStrategy = () => {
    dispatch(
      sendMessageToGPT([
        systemMsgStrategy,
        {
          role: 'user',
          content: `новое адапивное убеждение - ${adaptive}`,
        },
      ]),
    );
  };

  const onSentTogpt = useDebounce(handleAnalizeBelief, 770);

  return (
    <div className={classNames(cls.TherapyPage, {}, [className as string])}>
      {/* <div className={cls.title}>Список автоматических мыслей</div> */}

      <div className={cls.biasWrapper}>
        <Button
          //@ts-ignore
          theme="filled-green"
          onClick={onReframeClick}
        >
          Сделать рефрейминг
        </Button>

        <div className={cls.title}>Мои дисфункциональные убеждения</div>
        <div className={cls.list}>
          <span>bias </span>
          <span>bias </span>
          <span>bias </span>
          <span>bias </span>
          <span>bias </span>
          <span>bias </span>
          <span>bias </span>
        </div>
      </div>

      <div className={cls.formWrapper}>
        <div className={cls.inputs}>
          <InputRound
            value={disfunctional}
            type="text"
            onChange={onDisInputChange}
            placeholder="Дисфункциональное убеждение"
          />{' '}
          <InputRound
            value={adaptive}
            type="text"
            onChange={onAdaptiveInputChange}
            placeholder="Адаптивное убеждение"
          />
          <InputRound
            value={strategy}
            type="text"
            onChange={onStrategyInputChange}
            placeholder="Поведенческая стратегия"
          />
          <Button
            //@ts-ignore
            theme="filled-green"
            onClick={handleAnalizeStrategy}
          >
            Сохранить
          </Button>
        </div>
        <Button
          //@ts-ignore
          theme="filled-green"
          onClick={handleAnalizeBelief}
        >
          Проанализировать
        </Button>
        <Button
          //@ts-ignore
          theme="filled-green"
          onClick={handleAnalizeStrategy}
        >
          Создать стратегию
        </Button>
        {isLoading && <Preloader />}

        {advice && <div className={cls.advice}>{advice}</div>}
        {/* {advice &&
          advice.map((x) => {
            return <div className="">{x.content}</div>;
          })} */}
      </div>
      <div className={cls.title}>
        Стартап SequenceGenom msc app profiles with tips for genes
      </div>
    </div>
  );
};

export default TherapyPage;
