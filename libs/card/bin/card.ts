#!/usr/bin/env node

import * as boxen from 'boxen';
import { BorderStyle } from 'boxen';
import * as chalk from 'chalk';

const captains = console;
const spc = (n = 1) => Array(n).fill(' ').join('');

const data = {
  name: chalk.white('Guilherme Siquinelli'),
  challenge: [
    chalk.gray('Entregar experiências'),
    chalk.gray(`${spc(11)}atraentes e acessíveis`),
  ],
  work: chalk.green('Engenheiro front-end'),
  community: [
    chalk.green('DevParaná'),
    chalk.magenta(`${spc(11)}Hacktoberfest Brasil`)
  ],
  github: chalk.blue('https://github.com/guiseek'),
  twitter: chalk.blue('https://twitter.com/guiseek'),
  youtube: chalk.blue('https://youtube.com/c/Guiseek'),
  page: chalk.blue('https://guiseek.dev'),
  npx: chalk.white('npx @guiseek/card'),
  labelName: chalk.white.bold('      Name:'),
  labelGoal: chalk.white.bold('      Goal:'),
  labelCommunity: chalk.white.bold(' Community:'),
  labelWork: chalk.white.bold('      Work:'),
  labelPage: chalk.white.bold('      Page:'),
  labelGitHub: chalk.white.bold('    GitHub:'),
  labelTwitter: chalk.white.bold('   Twitter:'),
  labelYoutube: chalk.white.bold('   Youtube:'),
  labelCard: chalk.white.bold('      Card:'),
};

const newline = '\n';
const heading = `${data.labelName} ${data.name}`;
const handling = `${data.labelGoal} ${data.challenge[0]} \n ${data.challenge[1]}`;
const community = `${data.labelCommunity} ${data.community[0]} \n ${data.community[1]}`;
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
  community +
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
    borderStyle: BorderStyle.Round,
  })
);

captains.log(card);
