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
