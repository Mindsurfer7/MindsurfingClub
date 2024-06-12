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

export interface ChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
  system_fingerprint: string | null;
}

interface Choice {
  index: number;
  message: GPTmessage;
  logprobs: any | null; //  Можно заменить 'any' на более точный тип, если известно
  finish_reason: string;
}

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
