export interface TextEditorScheme {
  isLoading: boolean;
  error: string | undefined;
  text: string;
  isPublished: boolean;
  publicSelectOptions: Array<publicSelectOption>;
  articleTypeOptions: Array<string>;
  selectedArticleTypeOptions: Array<string>;
  imageLink: string;
  publicID: string;
}

type publicSelectOption = {
  value: string;
  content: string;
  isChoosen?: boolean;
};
