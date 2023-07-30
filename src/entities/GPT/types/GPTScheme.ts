export type GPTmessages = {
  content: string;
  role: string;
};

export interface GPTscheme {
  isLoading: boolean;
  singleMessage: string;
  messages: Array<GPTmessages>;
}
