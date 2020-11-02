import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { EleventySchematicSchema } from './schema';

describe('eleventy schematic', () => {
  let appTree: Tree;
  const options: EleventySchematicSchema = { name: 'test' };

  const testRunner = new SchematicTestRunner(
    '@guiseek/eleventy',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      testRunner.runSchematicAsync('eleventy', options, appTree).toPromise()
    ).resolves.not.toThrowError();
  });
});
