import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: "./apps/web/dev/src",
  projectName: "web-dev",
  outDir: './dist/static',
  routes: {
    '/code/:id': {
      type: 'contentFolder',
      id: {
        folder: "./blog/code"
      }
    },
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./blog"
      }
    },
  }
};