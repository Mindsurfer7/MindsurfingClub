import { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'shared/UI/Icon/Icon';
import cls from './AboutPage.module.scss';
// import logo from '../../../../public/LogoTransparent.svg?react';
import logo from '../../../../LogoTransparent.svg?react';
// import icon from `../../../../LogoTransparent.svg${isVite ? '?react' : ''}`;
import { Page } from 'widgets/Page';
import FileUpload from 'features/FileUpload/FileUpload';
import AudioRecorder from 'widgets/AudioRecorder/UI/AudioRecorder';
import VirtualList from 'widgets/VirtualList/VirtualList';

const about = [
  'async import of RC and redux reducers',
  'storybook usage',
  'unit, integration, screenshot testing',
  'FSD concept',
  'webpack configuration',
];

const features = [
  {
    title: 'Фича "Цели"',
    desciption:
      'Блоки с 3х месячными целями, где каждая будет расписана по научно изученным правилам поставновки целей. Также будет отдельный гайд-лонгрид, поясняющий что да как.',
  },
  {
    title: 'Мои качества',
    desciption:
      'Внедрить возможность добавлять личные качества: свои слабые и сильные стороны для рефлексии и планирования',
  },
  {
    title: '52 недели | Календарь',
    desciption:
      'Система недель, где у каждой недели есть своя тема и оповещения на эту тему в интерфейсе. Например, неделя внимания к эмоциям, неделя практики принятия и тд.',
  },
  {
    title: 'Рандомная награда',
    desciption:
      'Эта фишка создана для того, чтобы использовать систему вознаграждения мозга так же, как ее использует казино, но для благородных целей.',
  },
  {
    title: 'Win streak',
    desciption:
      'Так же как в играх хочется продолжать делать какое-то действие, если ты делал его каждый день и ни разу не срывался, так же и здесь win streak подразумевает увеличение награды с каждым днем, если это происходит без остановки, и мотивация усиливается за счет страха сломать стрик.',
  },
];

const AboutPage = memo(() => {
  const { t } = useTranslation('about');

  const arraySorterCreator = (arr: any) => {
    const sorted = [...arr].sort((a, b) => a.id - b.id);

    const getSortedArray = () => {
      return Object.freeze(sorted);
    };

    return {
      getSortedArray: getSortedArray,
    };
  };

  const sorter = arraySorterCreator([{ id: 1 }, { id: 2 }]);

  const arr = sorter.getSortedArray();

  // console.log({
  //   arrayt: arr,
  //   sorter: sorter,
  // });

  const array = new Array(450).fill(0);

  const [items, setItems] = useState(array);

  return (
    <Page className={cls.about}>
      {/* <div
        style={{
          height: 400,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <VirtualList
          itemHeight={70}
          array={array}
          count={array.length}
          viewportHeight={500}
        >
          {(index: number) => {
            return <div className={cls.listElem}>{index}</div>;
          }}
        </VirtualList>
      </div> */}

      <div className={cls.wrapper}>
        {/* <h1>My Professional Skillz</h1>

        <ul>
          {about.map((x, ix) => {
            return <li key={ix}>{x}</li>;
          })}
        </ul> */}

        <div className={cls.interface}>
          <FileUpload />
          <AudioRecorder />
        </div>

        <Icon className={cls.logo} Svg={logo} />

        <div className={cls.featureList}>
          {features.map((feat) => {
            return (
              <div className={cls.feature}>
                <span className={cls.featureTitle}>{feat.title}</span>
                <p className={cls.featureDescription}>{feat.desciption}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Page>
  );
});

export default AboutPage;

//  const countedArr = new Map();

//   function highestFrequency(array: any) {
//     let count = 0;
//     for (let i = 0; i < array.length; i++) {
//       if (countedArr.has(array[i])) {
//         let current = countedArr.get(array[i]);
//         countedArr.set(array[i], (current += 1));
//       } else {
//         countedArr.set(array[i], 1);
//       }
//     }
//    надо теп
//     return countedArr.forEach
//   }
