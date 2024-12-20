"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_import_nodes_1 = require("../get-import-nodes");
var get_sorted_nodes_1 = require("../get-sorted-nodes");
var get_sorted_nodes_modules_names_1 = require("../get-sorted-nodes-modules-names");
var get_sorted_nodes_names_1 = require("../get-sorted-nodes-names");
var code = "// first comment\n// second comment\nimport z from 'z';\nimport c, { cD } from 'c';\nimport g from 'g';\nimport { tC, tA, tB } from 't';\nimport k, { kE, kB } from 'k';\nimport * as a from 'a';\nimport * as x from 'x';\nimport BY from 'BY';\nimport Ba from 'Ba';\nimport XY from 'XY';\nimport Xa from 'Xa';\n";
test('it groups the imports', function () {
    var result = (0, get_import_nodes_1.getImportNodes)(code);
    var sorted = (0, get_sorted_nodes_1.getSortedNodes)(result, {
        importOrder: [['^k$', '^t'], ['^a$', '^B']],
        importOrderCaseInsensitive: true,
        importOrderSeparation: false,
        importOrderGroupNamespaceSpecifiers: false,
        importOrderSortSpecifiers: false,
        importOrderSideEffects: true,
    });
    expect((0, get_sorted_nodes_names_1.getSortedNodesNames)(sorted)).toEqual([
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
    var sortedNodeModuleNames = sorted
        .filter(function (node) { return node.type === 'ImportDeclaration'; })
        .map(function (importDeclaration) {
        return (0, get_sorted_nodes_modules_names_1.getSortedNodesModulesNames)(importDeclaration.specifiers);
    });
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
test('it sorts the grouped imports', function () {
    var result = (0, get_import_nodes_1.getImportNodes)(code);
    var sorted = (0, get_sorted_nodes_1.getSortedNodes)(result, {
        importOrder: [['^t', '^k$'], ['^B', '^a$']],
        importOrderCaseInsensitive: true,
        importOrderSeparation: false,
        importOrderGroupNamespaceSpecifiers: false,
        importOrderSortSpecifiers: false,
        importOrderSideEffects: true,
    });
    expect((0, get_sorted_nodes_names_1.getSortedNodesNames)(sorted)).toEqual([
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
    var sortedNodeModuleNames = sorted
        .filter(function (node) { return node.type === 'ImportDeclaration'; })
        .map(function (importDeclaration) {
        return (0, get_sorted_nodes_modules_names_1.getSortedNodesModulesNames)(importDeclaration.specifiers);
    });
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
