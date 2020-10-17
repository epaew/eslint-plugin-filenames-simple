import 'core-js/features/array/flat-map';
import {
  AST_NODE_TYPES,
  DestructuringPattern,
  ExportDeclaration,
  ExportNamedDeclaration,
  ExportSpecifier,
  Identifier,
  Maybe,
  Node,
  ObjectProperty,
  Program,
  PropertyValue,
  Statement,
  VariableDeclaration,
  VariableDeclarator,
} from './types';

// functions
const getStatementsFromProgram = <T extends Statement>(node: Program, statementType: T['type']) =>
  (node.body as Statement[]).filter((n): n is T => n.type === statementType);

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
  private readonly results: Node[];

  constructor(nodes: Node | Node[]) {
    this.results = Array.isArray(nodes) ? nodes : [nodes];
  }

  unwrap(): Node[] {
    return this.results;
  }

  private getStatementsFromProgram<T extends Statement>(type: T['type']): ESTreeParser {
    const results = this.results
      .filter((result): result is Program => result.type === 'Program')
      .flatMap(result => getStatementsFromProgram<T>(result, type));

    return new ESTreeParser(results);
  }

  getExportAllDeclarationsFromProgram(): ESTreeParser {
    return this.getStatementsFromProgram(AST_NODE_TYPES.ExportAllDeclaration);
  }

  getExportDefaultDeclarationsFromProgram(): ESTreeParser {
    return this.getStatementsFromProgram(AST_NODE_TYPES.ExportDefaultDeclaration);
  }

  getExportNamedDeclarationsFromProgram(): ESTreeParser {
    return this.getStatementsFromProgram(AST_NODE_TYPES.ExportNamedDeclaration);
  }

  getIdentifiersFromExportNamedDeclaration(): ESTreeParser {
    const results = this.results
      .filter(
        (result): result is ExportNamedDeclaration => result.type === 'ExportNamedDeclaration',
      )
      .flatMap(result => getIdentifiersFromExportNamedDeclaration(result));

    return new ESTreeParser(results);
  }
}
