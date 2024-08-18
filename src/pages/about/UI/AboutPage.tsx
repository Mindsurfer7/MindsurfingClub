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
