/**
 * 
 * 	Part 2 – Refactoring an expression tree
	⏱ We estimate that this should take 30 to 60 minutes, but please take as much or as little time as you need.

	We have provided a fairly naive implementation of an expression tree for basic arithmetic in JavaScript and Ruby. Pick whichever language you feel more comfortable working in for this section.

	Apply your knowledge of good software design principles to refactor and improve the design of this code. Feel free to change anything in the file as part of your refactoring, apart from the final assertions that consume the tree.
 * 
 */


const assert = require("assert");

const Node = (operator, value, left, right) => {

  // Define all operators
  const dividers_operators = ['%', '/', '÷']
  const multipliers_operators = ['x', '·', '*']
  const operators = ['+', '-', ...multipliers_operators, ...dividers_operators]
	
  const result = function () {
    if(!operators.includes(operator)) return value
    
    // Transform to correct operator for 'eval' function
    if(multipliers_operators.includes(operator)) operator = '*'
    if(dividers_operators.includes(operator)) operator = '/'

    // Evaluates string value that contains valid JavaScript Code
    return eval(`${left.result()} ${operator} ${right.result()}`)
  };

  const toString = function () {
    return !operators.includes(operator) ? `${value}` : `(${left} ${operator} ${right})`
  };

  return {
    operator,
    value,
    left,
    right,
    result,
    toString
  };
};

const tree = Node(
  "÷",
  null,
  Node(
    "+",
    null,
    Node("", 7, null, null),
    Node(
      "x",
      null,
      Node("-", null, Node("", 3, null, null), Node("", 2, null, null)),
      Node("", 5, null, null)
    )
  ),
  Node("", 6, null, null)
);

assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());
