import { ImportDeclaration } from '@babel/types';

import { getImportNodes } from '../get-import-nodes';
import { getSortedNodes } from '../get-sorted-nodes';
import { getSortedNodesModulesNames } from '../get-sorted-nodes-modules-names';
import { getSortedNodesNames } from '../get-sorted-nodes-names';

const code = `// first comment
// second comment
import z from 'z';
import c, { cD } from 'c';
import g from 'g';
import { tC, tA, tB } from 't';
import k, { kE, kB } from 'k';
import * as a from 'a';
import * as x from 'x';
import BY from 'BY';
import Ba from 'Ba';
import XY from 'XY';
import Xa from 'Xa';
`;

test('it groups the imports', () => {
  const result = getImportNodes(code);
  const sorted = getSortedNodes(result, {
    importOrder: [['^k$', '^t'], ['^a$', '^B']],
    importOrderCaseInsensitive: true,
    importOrderSeparation: false,
    importOrderGroupNamespaceSpecifiers: false,
    importOrderSortSpecifiers: false,
    importOrderSideEffects: true,
  }) as ImportDeclaration[];
  expect(getSortedNodesNames(sorted)).toEqual([
    'c',
    'g',
    'x',
    'Xa',
    'XY',
    'z',
    'k',
    't',
    'a',
    'Ba',
    'BY',
  ]);
  const sortedNodeModuleNames = sorted
      .filter((node) => node.type === 'ImportDeclaration')
      .map((importDeclaration) =>
        getSortedNodesModulesNames(importDeclaration.specifiers),
      )
  expect(sortedNodeModuleNames).toEqual([
    ['c', 'cD'],
    ['g'],
    ['x'],
    ['Xa'],
    ['XY'],
    ['z'],
    ['k', 'kE', 'kB'],
    ['tC', 'tA', 'tB'],
    ['a'],
    ['Ba'],
    ['BY'],
  ]);
});

test('it sorts the grouped imports', () => {
  const result = getImportNodes(code);
  const sorted = getSortedNodes(result, {
    importOrder: [['^t', '^k$'], ['^B', '^a$']],
    importOrderCaseInsensitive: true,
    importOrderSeparation: false,
    importOrderGroupNamespaceSpecifiers: false,
    importOrderSortSpecifiers: false,
    importOrderSideEffects: true,
  }) as ImportDeclaration[];
  expect(getSortedNodesNames(sorted)).toEqual([
    'c',
    'g',
    'x',
    'Xa',
    'XY',
    'z',
    'k',
    't',
    'a',
    'Ba',
    'BY',
  ]);
  const sortedNodeModuleNames = sorted
    .filter((node) => node.type === 'ImportDeclaration')
    .map((importDeclaration) =>
      getSortedNodesModulesNames(importDeclaration.specifiers),
    )
  expect(sortedNodeModuleNames).toEqual([
    ['c', 'cD'],
    ['g'],
    ['x'],
    ['Xa'],
    ['XY'],
    ['z'],
    ['k', 'kE', 'kB'],
    ['tC', 'tA', 'tB'],
    ['a'],
    ['Ba'],
    ['BY'],
  ]);
});
