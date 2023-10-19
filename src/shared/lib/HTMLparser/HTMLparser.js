export function extractFirstHtmlTagContent(htmlString) {
  // Создаем временный DOM-элемент с помощью DOMParser
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Получаем первый элемент
  const firstElement = doc.body.firstChild;

  // Если есть первый элемент и у него есть текстовое содержимое, возвращаем его
  return (firstElement && firstElement.textContent) || null;
}
