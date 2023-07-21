import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
  };

  //config.resolve?.modules? = [ paths.src, "node_modules" ]

  config.resolve?.modules?.push(
    path.relative(__dirname, '../src'),
    'node_modules',
  );
  //config.resolve!.modules!.push(paths.src);

  config.resolve!.extensions!.push('.ts', '.tsx');

  //@ts-ignore
  config.module!.rules = config.module!.rules!.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i };
    }

    return rule;
  });

  config.module!.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });
  config.module!.rules.push(buildCssLoader(true));

  config.plugins?.push(
    new DefinePlugin({
      IS_DEV: true,
    }),
  );

  return config;
};
