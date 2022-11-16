/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {test} from 'uvu';
// eslint-disable-next-line import/extensions
import * as assert from 'uvu/assert';
import {collectResult, collectResultSync} from '../../lib/render-result.js';

test('collectResultSync collects strings', () => {
  assert.equal(collectResultSync(['a', 'b', 'c']), 'abc');
});

test('collectResultSync collects strings and iterables', () => {
  assert.equal(collectResultSync(['a', ['b', 'c'], 'd']), 'abcd');
});

test('collectResultSync throws for a Promise', () => {
  assert.throws(
    () => collectResultSync(['a', Promise.resolve('b'), 'c']),
    'abc'
  );
});

test('collectResult throws for iterables of Promises', async () => {
  assert.throws(
    () => collectResultSync(['a', [Promise.resolve('b')], 'c']),
    'abc'
  );
});

test('collectResult collects strings', async () => {
  assert.equal(await collectResult(['a', 'b', 'c']), 'abc');
});

test('collectResultSync collects strings and iterables', async () => {
  assert.equal(await collectResult(['a', ['b', 'c'], 'd']), 'abcd');
});

test('collectResult collects strings and Promises', async () => {
  assert.equal(await collectResult(['a', Promise.resolve('b'), 'c']), 'abc');
});

test('collectResult collects strings and iterables of Promises', async () => {
  assert.equal(await collectResult(['a', [Promise.resolve('b')], 'c']), 'abc');
});

test.run();
