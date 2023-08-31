export interface ChatScheme {
  isLoading: boolean;
  message: string;
  messages: Array<Message>;
  isIDExist: boolean;
}

export interface Message {
  text: string;
  createdAt: Date;
  username: string;
}
