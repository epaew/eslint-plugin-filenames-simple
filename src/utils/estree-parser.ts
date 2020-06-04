import * as ESTree from 'estree';
import { TSESTree as TSTree } from '@typescript-eslint/typescript-estree';

import '../utils/polyfill.node10';

// types
type Maybe<T> = T | undefined;

export type DestructuringPattern = ESTree.Pattern | TSTree.DestructuringPattern;
export type ExportDeclaration = ESTree.Declaration | TSTree.ExportDeclaration | null;
export type ExportNamedDeclaration = ESTree.ExportNamedDeclaration | TSTree.ExportNamedDeclaration;
export type ExportSpecifier = ESTree.ExportSpecifier | TSTree.ExportSpecifier;
export type Identifier = ESTree.Identifier | TSTree.Identifier;
export type Node = ESTree.Node | TSTree.Node;
export type ObjectPattern = ESTree.ObjectPattern | TSTree.ObjectPattern;
export type ObjectProperty = ESTree.AssignmentPattern | RestElement | TSTree.Property;
export type Program = ESTree.Program | TSTree.Program;
export type PropertyValue = TSTree.Property['value'];
export type RestElement = ESTree.RestElement | TSTree.RestElement;
export type Statement = ESTree.Statement | TSTree.Statement;
export type VariableDeclaration = ESTree.VariableDeclaration | TSTree.VariableDeclaration;
export type VariableDeclarator = ESTree.VariableDeclarator | TSTree.VariableDeclarator;

// functions
const getExportNamedDeclarationfromProgram = (node: Program): ExportNamedDeclaration[] =>
  (node.body as Statement[]).filter(
    n => n.type === 'ExportNamedDeclaration',
  ) as ExportNamedDeclaration[];

const getIdentifiersFromDeclarationOfExportNamedDeclaration = (
  node: Maybe<ExportDeclaration>,
): Identifier[] => {
  if (!node) return [];

  switch (node.type) {
    case 'ClassDeclaration':
    case 'ClassExpression':
    case 'FunctionDeclaration':
    case 'TSDeclareFunction':
    case 'TSEnumDeclaration':
    case 'TSInterfaceDeclaration':
    case 'TSTypeAliasDeclaration':
      return node.id ? [node.id] : [];
    case 'TSModuleDeclaration':
      return node.id.type === 'Identifier' ? [node.id] : [];
    case 'VariableDeclaration':
      return getIdentifiersFromVariableDeclaration(node);
    default:
      console.error(new Error(`UnknownDeclaration: ${node}`));
      return [];
  }
};

const getIdentifiersFromDestructuringPattern = (
  node: DestructuringPattern | null,
): Identifier[] => {
  if (!node) return [];

  switch (node.type) {
    case 'ArrayPattern':
      return (node.elements as DestructuringPattern[]).flatMap(e =>
        getIdentifiersFromDestructuringPattern(e),
      );
    case 'AssignmentPattern':
      return getIdentifiersFromDestructuringPattern(node.left);
    case 'Identifier':
      return [node];
    case 'MemberExpression':
      return []; // MemberExpression has no Identifier.
    case 'ObjectPattern':
      return (node.properties as ObjectProperty[]).flatMap(e =>
        getIdentifiersFromObjectProperty(e),
      );
    case 'RestElement':
      return getIdentifiersFromDestructuringPattern(node.argument);
    default:
      console.error(new Error(`UnknownDestructuringPattern: ${node}`));
      return [];
  }
};

const getIdentifiersFromObjectProperty = (node: ObjectProperty): Identifier[] => {
  switch (node.type) {
    case 'AssignmentPattern':
    case 'RestElement':
      return getIdentifiersFromDestructuringPattern(node);
    case 'Property':
      return getIdentifiersFromPropertyValue(node.value);
    default:
      console.error(new Error(`UnknownObjectProperty: ${node}`));
      return [];
  }
};

const getIdentifiersFromPropertyValue = (node: PropertyValue): Identifier[] => {
  switch (node.type) {
    case 'AssignmentPattern':
      return getIdentifiersFromDestructuringPattern(node.left);
    case 'Identifier':
      return [node];
    case 'ObjectPattern':
      return (node.properties as ObjectProperty[]).flatMap(e =>
        getIdentifiersFromObjectProperty(e),
      );
    default:
      console.error(`Sorry, parser For Expression: ${node} is not implemented.`);
      return [];
  }
};

const getIdentifiersFromSpecifiersOfExportNamedDeclaration = (
  nodes: ExportSpecifier[],
): Identifier[] => nodes.map(n => n.exported);

const getIdentifiersFromExportNamedDeclaration = (node: ExportNamedDeclaration): Identifier[] => [
  ...getIdentifiersFromDeclarationOfExportNamedDeclaration(node.declaration),
  ...getIdentifiersFromSpecifiersOfExportNamedDeclaration(node.specifiers),
];

const getIdentifiersFromVariableDeclaration = (node: VariableDeclaration): Identifier[] =>
  (node.declarations as VariableDeclarator[]).flatMap(n =>
    getIdentifiersFromDestructuringPattern(n.id),
  );

// class
export class ESTreeParser {
  private _results: Node[];

  constructor(node: Node) {
    this._results = [node];
  }

  get results(): Node[] {
    return this._results;
  }

  getExportNamedDeclarationfromProgram(): ESTreeParser {
    this._results = this._results
      .filter((result): result is Program => result.type === 'Program')
      .flatMap(result => getExportNamedDeclarationfromProgram(result));

    return this;
  }

  getIdentifiersFromExportNamedDeclaration(): ESTreeParser {
    this._results = this._results
      .filter(
        (result): result is ExportNamedDeclaration => result.type === 'ExportNamedDeclaration',
      )
      .flatMap(result => getIdentifiersFromExportNamedDeclaration(result));

    return this;
  }
}
