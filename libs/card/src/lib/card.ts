#!/usr/bin/env node

import * as boxen from 'boxen';
import * as chalk from 'chalk';

const captains = console;

const data = {
  name: chalk.white('  Gui Seek:'),
  handle: chalk.cyan(' Degustador da boa tecnologia'),
  work: chalk.white('Engenheiro front-end'),
  github: chalk.cyan('https://github.com/guiseek'),
  twitter: chalk.cyan('https://twitter.com/guiseek'),
  youtube: chalk.cyan('https://youtube.com/c/Guiseek'),
  page: chalk.cyan('https://guiseek.dev'),
  npx: chalk.white('npx @guiseek/card'),
  labelWork: chalk.white.bold('      Work:'),
  labelPage: chalk.white.bold('      Page:'),
  labelGitHub: chalk.white.bold('    GitHub:'),
  labelTwitter: chalk.white.bold('   Twitter:'),
  labelYoutube: chalk.white.bold('   Youtube:'),
  labelCard: chalk.white.bold('      Card:'),
};

const newline = '\n';
const heading = `${data.name} ${data.handle}`;
const working = `${data.labelWork}  ${data.work} \n`;
const pageing = `${data.labelPage}  ${data.page}`;
const githubing = `${data.labelGitHub}  ${data.github}`;
const twittering = `${data.labelTwitter}  ${data.twitter}`;
const youtubeing = `${data.labelYoutube}  ${data.youtube}`;
const carding = `${data.labelCard}  ${data.npx}`;

const output =
  heading +
  newline +
  newline +
  working +
  newline +
  pageing +
  newline +
  githubing +
  newline +
  twittering +
  newline +
  youtubeing +
  newline +
  newline +
  carding;

const card = chalk.green(
  boxen(output, {
    padding: 1,
    margin: 1,
  })
);

captains.log(card);
