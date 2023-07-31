export type GPTmessage = {
  content: string;
  role: string;
};

export interface GPTscheme {
  isLoading: boolean;
  error?: any;
  singleMessage: string;
  messages: Array<GPTmessage>;
  conversations?: any; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
}
