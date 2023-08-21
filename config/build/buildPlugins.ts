import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpachPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import DotenvWebpackPlugin from 'dotenv-webpack';
import { InjectManifest } from 'workbox-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export function buildPlugins({
  paths,
  isDev,
  API_URL,
  project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const apiKey = process.env.API_KEY;
  const publicFolderPath = path.resolve(__dirname, '../../public');

  const plugins = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(isDev),
      API_URL: JSON.stringify(API_URL),
      APIkey: JSON.stringify(apiKey),
      PROJECT: JSON.stringify(project),
    }),
    new DotenvWebpackPlugin(),
    new InjectManifest({
      include: [
        /\.(html|js|css|woff2|json|wasm)$/,
        /static\/.*\.(png|gif|jpg|svg)$/,
      ],
      exclude: [
        /version\.json/,
        /extension-dist/,
        /\.map$/,
        /data\/d1\/manifests/,
        /manifest-webapp/,
      ],
      swSrc: path.join(process.cwd(), './service-worker.js'),
      swDest: path.resolve(paths.build, 'service-worker.js'),
    }),

    new CopyPlugin({
      patterns: [
        { from: path.resolve(publicFolderPath, 'manifest.json'), to: '' },
        {
          from: path.resolve(
            publicFolderPath,
            'manifest-icon-192.maskable.png',
          ),
          to: '',
        },
        {
          from: path.resolve(
            publicFolderPath,
            'manifest-icon-512.maskable.png',
          ),
          to: '',
        },
        { from: path.resolve(publicFolderPath, 'favicon-196.png'), to: '' },
        { from: path.resolve(publicFolderPath, 'apple-icon-180.png'), to: '' },
        {
          from: path.resolve(publicFolderPath, 'apple-splash-1125-2436.jpg'),
          to: '',
        },
      ],
    }),
  ];

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new ReactRefreshWebpachPlugin());

    // plugins.push(
    //   new BundleAnalyzerPlugin({
    //     openAnalyzer: false,
    //   }),
    // );
  }
  return plugins;
}
