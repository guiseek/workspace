#!/usr/bin/env node

import * as boxen from 'boxen';
import * as chalk from 'chalk';

const captains = console;

const data = {
  name: chalk.white('Guilherme Siquinelli'),
  extra: chalk.gray('Degustador de tecnologia'),
  work: chalk.green('Engenheiro front-end'),
  github: chalk.cyan('https://github.com/guiseek'),
  twitter: chalk.cyan('https://twitter.com/guiseek'),
  youtube: chalk.cyan('https://youtube.com/c/Guiseek'),
  page: chalk.cyan('https://guiseek.dev'),
  npx: chalk.white('npx @guiseek/card'),
  labelName: chalk.white.bold('      Name:'),
  labelExtra: chalk.white('     Extra:'),
  labelWork: chalk.white.bold('      Work:'),
  labelPage: chalk.white.bold('      Page:'),
  labelGitHub: chalk.white.bold('    GitHub:'),
  labelTwitter: chalk.white.bold('   Twitter:'),
  labelYoutube: chalk.white.bold('   Youtube:'),
  labelCard: chalk.white.bold('      Card:'),
};

const newline = '\n';
const heading = `${data.labelName} ${data.name}`;
const handling = `${data.labelExtra} ${data.extra}`;
const working = `${data.labelWork} ${data.work}`;
const pageing = `${data.labelPage} ${data.page}`;
const githubing = `${data.labelGitHub} ${data.github}`;
const twittering = `${data.labelTwitter} ${data.twitter}`;
const youtubeing = `${data.labelYoutube} ${data.youtube}`;
const carding = `${data.labelCard} ${data.npx}`;

const output =
  heading +
  newline +
  working +
  newline +
  handling +
  newline +
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
