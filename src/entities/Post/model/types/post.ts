export interface PostBlock {
  paragraphs: Array<string>;
  type: 'TEXT' | 'IMAGE';
  id: string;
}

export interface PostType {
  createdAt: string;
  img: string;
  id: string;
  publicID: string;
  authorID: string;
  views: number;
  likes: Array<string>;
  blocks: PostBlock[];
}
