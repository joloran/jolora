import dotenv from 'dotenv'
import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import webpack from 'webpack'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new webpack.DefinePlugin({
    'process.platform': JSON.stringify(process.platform),
    'process.env.API_URL': JSON.stringify(process.env.API_URL),
    'process.env.TOKEN': JSON.stringify(process.env.TOKEN),
  }),
  new webpack.EnvironmentPlugin({
    API_URL: process.env.API_URL,
    TOKEN: process.env.TOKEN,
  }),
]
