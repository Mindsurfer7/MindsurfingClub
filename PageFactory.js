const fs = require('fs');
const path = require('path');

// Замените эту функцию на ваш шаблон для "NamePage.tsx"
function generateTsxTemplate(pageName) {
  return `import cls from "${pageName}.module.scss"

const ${pageName} = (): JSX.Element => {
return (
<div>
{/* Ваш код страницы "${pageName}" */}
</div>
);
};

export default ${pageName};
`;
}
function generateTestTsxTemplate(pageName) {
  return `describe('${pageName}', () => {
    test('', () => {
        expect().toEqual();
     });
 });
`;
}

// Замените эту функцию на ваш шаблон для "NamePage.module.scss"
function generateScssTemplate(pageName) {
  return `/* Ваши стили для страницы "${pageName}" */
.${pageName} {
/* Стили для "${pageName}" */
}
`;
}

// Замените эту функцию на ваш шаблон для "NamePage.async.ts"
function generateAsyncTemplate(pageName) {
  return `import { lazy } from 'react';

export const ${pageName}Async = lazy(() => import('./${pageName}'));
`;
}

function generateStoriesTemplate(pageName) {
  return `import { ComponentStory, ComponentMeta } from "@storybook/react";

  export default {
    title: "shared/${pageName}",
    component: ${pageName},
    argTypes: {
      backgroundColor: { control: "color" },
    },
  } as ComponentMeta<typeof ${pageName}>;
  
  const Template: ComponentStory<typeof ${pageName}> = (args) => <${pageName} {...args} />;
  
  export const Primary = Template.bind({});
  Primary.args = {
  };
`;
}

function createFiles(pageName) {
  const tsxContent = generateTsxTemplate(pageName);
  const tsxTestContent = generateTestTsxTemplate(pageName);
  const scssContent = generateScssTemplate(pageName);
  const asyncContent = generateAsyncTemplate(pageName);
  const storiesContent = generateStoriesTemplate(pageName);

  const tsxFileName = `${pageName}.tsx`;
  const tsxTestFileName = `${pageName}.test.tsx`;
  const scssFileName = `${pageName}.module.scss`;
  const asyncFileName = `${pageName}.async.tsx`;
  const storyFileName = `${pageName}.stories.tsx`;

  fs.writeFileSync(path.join(__dirname, tsxFileName), tsxContent);
  fs.writeFileSync(path.join(__dirname, tsxTestFileName), tsxTestContent);
  fs.writeFileSync(path.join(__dirname, scssFileName), scssContent);
  fs.writeFileSync(path.join(__dirname, asyncFileName), asyncContent);
  fs.writeFileSync(path.join(__dirname, storyFileName), storiesContent);

  console.log(
    `Созданы файлы: ${tsxFileName}, ${scssFileName}, ${asyncFileName}, ${storyFileName}, ${tsxTestFileName}`,
  );
}

const pageName = process.argv[2];
if (!pageName) {
  console.error('Пожалуйста, укажите имя страницы.');
} else {
  createFiles(pageName);
}
