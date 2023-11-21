import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'shared/UI/Icon/Icon';
import cls from './AboutPage.module.scss';
import logo from '../../../../public/LogoTransparent.svg';
import { Page } from 'widgets/Page';

const about = [
  'async import of RC and redux reducers',
  'storybook usage',
  'unit, integration, screenshot testing',
  'FSD concept',
  'webpack configuration',
];

const AboutPage = memo(() => {
  const { t } = useTranslation('about');

  // function allAnagrams(array: any) {

  //   for(let i = 0; i < array.length; i++) {
  // if (new Set(array[i]) === ) {

  // }
  //   }

  // }

  // console.log(allAnagrams(['abcd', 'bdac', 'cabd'])); // true
  // console.log(allAnagrams(['abcd', 'bdXc', 'cabd'])); // false

  console.log('=================');

  return (
    <Page className={cls.about}>
      <div>
        <h1>My Professional Skillz</h1>
        <ul>
          {about.map((x) => {
            return <li>{x}</li>;
          })}
        </ul>
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
