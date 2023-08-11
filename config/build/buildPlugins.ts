import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpachPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export function buildPlugins({
  paths,
  isDev,
  API_URL,
  project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const apiKey = process.env.API_KEY;

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
