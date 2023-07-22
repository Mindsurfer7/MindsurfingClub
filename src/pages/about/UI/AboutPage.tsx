import { useTranslation } from 'react-i18next';

const about = [
  'async import of RC and redux reducers',
  'storybook usage',
  'unit, integration, screenshot testing',
  'FSD concept',
  'webpack configuration',
];

const AboutPage = () => {
  const { t } = useTranslation('about');

  return (
    <div>
      <h1>My Professional Skillz</h1>
      <ul>
        {about.map((x) => {
          return <li>{x}</li>;
        })}
      </ul>
    </div>
  );
};

export default AboutPage;
