import * as Colors from './colors';
import * as Breakpoints from './breakpoints';
import * as Sizes from './sizes';

export const outlineContainer = `
  border: 2px solid ${Colors.blue20};
  border-radius: 6px;
`;

export const articleMaxWidth = `
  width: 100vw;
  max-width: ${Sizes.maxArticleWidth};
  padding-left: 80px;
  padding-right: 80px;
  box-sizing: border-box;

  @media(max-width: ${Sizes.maxArticleWidth}) {
    max-width: 100vw;
  }

  @media(max-width: ${Breakpoints.mobile}) {
    padding: 0 6vw;
  }
`;
