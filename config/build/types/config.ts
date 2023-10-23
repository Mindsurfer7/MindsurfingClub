export type BuildMode = 'production' | 'development';

export interface BuildPaths {
  entry: string;
  build: string;
  html: string;
  src: string;
  locales: string;
  buildLocales: string;
}
export interface BuildEnv {
  mode: BuildMode;
  port: number;
  API_URL: string;
  API_KEY: string;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
  API_URL: string;
  API_KEY: string;
  project: 'storybook' | 'frontend' | 'jest';
}
