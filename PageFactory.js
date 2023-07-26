const fs = require('fs');
const path = require('path');

// Замените эту функцию на ваш шаблон для "NamePage.tsx"
function generateTsxTemplate(pageName) {
  return `import cls from "${pageName}Page.module.scss"

const ${pageName}Page = (): JSX.Element => {
return (
<div>
{/* Ваш код страницы "${pageName}" */}
</div>
);
};

export default ${pageName}Page;
`;
}

// Замените эту функцию на ваш шаблон для "NamePage.module.scss"
function generateScssTemplate(pageName) {
  return `/* Ваши стили для страницы "${pageName}" */
.${pageName}Page {
/* Стили для "${pageName}" */
}
`;
}

// Замените эту функцию на ваш шаблон для "NamePage.async.ts"
function generateAsyncTemplate(pageName) {
  return `import { lazy } from 'react';

export const ${pageName}PageAsync = lazy(() => import('./${pageName}Page'));
`;
}

function createFiles(pageName) {
  const tsxContent = generateTsxTemplate(pageName);
  const scssContent = generateScssTemplate(pageName);
  const asyncContent = generateAsyncTemplate(pageName);

  const tsxFileName = `${pageName}Page.tsx`;
  const scssFileName = `${pageName}Page.module.scss`;
  const asyncFileName = `${pageName}Page.async.ts`;

  fs.writeFileSync(path.join(__dirname, tsxFileName), tsxContent);
  fs.writeFileSync(path.join(__dirname, scssFileName), scssContent);
  fs.writeFileSync(path.join(__dirname, asyncFileName), asyncContent);

  console.log(
    `Созданы файлы: ${tsxFileName}, ${scssFileName}, ${asyncFileName}`,
  );
}

const pageName = process.argv[2];
if (!pageName) {
  console.error('Пожалуйста, укажите имя страницы.');
} else {
  createFiles(pageName);
}
