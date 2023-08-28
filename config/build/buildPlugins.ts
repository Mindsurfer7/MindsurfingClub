import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
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
    // new InjectManifest({
    //   include: [
    //     /\.(html|js|css|woff2|json|wasm)$/,
    //     /static\/.*\.(png|gif|jpg|svg)$/,
    //   ],
    //   exclude: [
    //     /version\.json/,
    //     /extension-dist/,
    //     /\.map$/,
    //     /data\/d1\/manifests/,
    //     /manifest-webapp/,
    //   ],
    //   swSrc: path.join(process.cwd(), './service-worker.js'),
    //   swDest: path.resolve(paths.build, 'service-worker.js'),
    // }),

    // new CopyPlugin({
    //   patterns: [
    //     { from: path.resolve(publicFolderPath, 'manifest.json'), to: '' },
    //     {
    //       from: path.resolve(
    //         publicFolderPath,
    //         'manifest-icon-192.maskable.png',
    //       ),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(
    //         publicFolderPath,
    //         'manifest-icon-512.maskable.png',
    //       ),
    //       to: '',
    //     },
    //     { from: path.resolve(publicFolderPath, 'favicon-196.png'), to: '' },
    //     { from: path.resolve(publicFolderPath, 'apple-icon-180.png'), to: '' },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-1125-2436.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-2048-2732.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-2732-2048.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-1668-2388.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-2388-1668.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-1536-2048.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-2048-1536.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-1668-2224.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-2224-1668.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-1620-2160.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-2160-1620.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-1290-2796.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-2796-1290.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-1179-2556.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-2556-1179.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-1284-2778.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-2778-1284.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-1170-2532.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-2532-1170.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-2436-1125.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-1242-2688.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-2688-1242.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-828-1792.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-1792-828.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-1242-2208.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-2208-1242.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-750-1334.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-1334-750.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-640-1136.jpg'),
    //       to: '',
    //     },
    //     {
    //       from: path.resolve(publicFolderPath, 'apple-splash-1136-640.jpg'),
    //       to: '',
    //     },
    //     { from: path.resolve(publicFolderPath, 'mstile-icon-128.png'), to: '' },
    //     { from: path.resolve(publicFolderPath, 'mstile-icon-270.png'), to: '' },
    //     { from: path.resolve(publicFolderPath, 'mstile-icon-558.png'), to: '' },
    //     {
    //       from: path.resolve(publicFolderPath, 'mstile-icon-558-270.png'),
    //       to: '',
    //     },
    //   ],
    // }),
  ];

  if (isDev) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());

    // plugins.push(
    //   new BundleAnalyzerPlugin({
    //     openAnalyzer: false,
    //   }),
    // );
  }
  return plugins;
}
