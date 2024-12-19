import { ImportDeclaration } from '@babel/types';

import {
    THIRD_PARTY_MODULES_SPECIAL_WORD,
    THIRD_PARTY_TYPES_SPECIAL_WORD,
    TYPES_SPECIAL_WORD,
} from '../constants';

/**
 * Get the regexp group to keep the import nodes.
 * @param node
 * @param importOrder
 */
export const getImportNodesMatchedGroup = (
    node: ImportDeclaration,
    importOrder: Array<string | string[]>,
) => {
    const importOrderArrayed = importOrder.map(x => (typeof x === 'string' ? [x] : x));
    const groupWithRegExp = importOrderArrayed.map((group) => ({
        group,
        regExps: group.map(x => x.startsWith(TYPES_SPECIAL_WORD)
            ? new RegExp(x.replace(TYPES_SPECIAL_WORD, ''))
            : new RegExp(x)),
    }));

    // finding the group for non-type imports is easy: it's the first group that matches.
    // however, for type imports, we need to make sure that we don't match a non-type group
    // that's earlier in the list than a type-specific group that would otherwise match.
    // so we need to get all matching groups, look for the first matching _type-specific_ group,
    // and if it exists, return it. otherwise, return the first matching group if there is one.
    const matchingGroups = groupWithRegExp.filter(({ group, regExps }) => {
        return group.some(((x, i) => {
            if (
              x.startsWith(TYPES_SPECIAL_WORD) &&
              node.importKind !== 'type'
            ) {
                return false;
            } else {
                return node.source.value.match(regExps[i]) !== null;
            }
        }))
    });

    if (matchingGroups.length === 0) {
        return [
          node.importKind === 'type' &&
            importOrderArrayed.find(
                (group) => group.includes(THIRD_PARTY_TYPES_SPECIAL_WORD),
            )
            ? THIRD_PARTY_TYPES_SPECIAL_WORD
            : THIRD_PARTY_MODULES_SPECIAL_WORD
        ].join('');
    } else if (node.importKind !== 'type') {
        return matchingGroups[0].group.join('');
    } else {
        for (const { group } of matchingGroups) {
            if (group.some(x => x.startsWith(TYPES_SPECIAL_WORD))) return group.join('');
        }
        return matchingGroups[0].group.join('');
    }
};
