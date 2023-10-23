export interface PostBlock {
  paragraphs: Array<string>;
  type: 'TEXT' | 'IMAGE';
  id: string;
}

export interface PostType {
  createdAt: string;
  img: string;
  publicID: string;
  authorID: string;
  views: number;
  blocks: PostBlock[];
}
