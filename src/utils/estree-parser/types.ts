import * as ESTree from 'estree';
import { TSESTree as TSTree } from '@typescript-eslint/typescript-estree';
export { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';

export type Maybe<T> = T | undefined;

export type DestructuringPattern = ESTree.Pattern | TSTree.DestructuringPattern;
export type ExportDeclaration = ESTree.Declaration | TSTree.ExportDeclaration | null;
export type ExportAllDeclaration = TSTree.ExportAllDeclaration;
export type ExportDefaultDeclaration = TSTree.ExportDefaultDeclaration;
export type ExportNamedDeclaration = TSTree.ExportNamedDeclaration;
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
