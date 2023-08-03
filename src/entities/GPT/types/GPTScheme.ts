export type GPTmessage = {
  content: string;
  role: string;
};

//export type DialogsState = 'zero' | 'exist';

export interface GPTscheme {
  isLoading: boolean;
  InputValue: string;
  error?: any;
  singleMessage: string;
  messages: Array<GPTmessage>;
  conversations?: any; // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
}
