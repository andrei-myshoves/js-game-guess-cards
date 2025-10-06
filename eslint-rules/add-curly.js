export const rules = {
    'add-curly': {
        meta: {
            type: 'suggestion',
            docs: {
                description: 'Ensure curly braces for all control statements',
            },
            fixable: 'code',
        },
        create(context) {
            return {
                IfStatement(node) {
                    if (node.consequent && node.consequent.type !== 'BlockStatement') {
                        context.report({
                            node: node.consequent,
                            message: 'Add curly braces to if statement.',
                            fix(fixer) {
                                const sourceCode = context.sourceCode
                                const text = sourceCode.getText(node.consequent)
                                return fixer.replaceText(node.consequent, `{ ${text} }`)
                            },
                        })
                    }

                    if (
                        node.alternate &&
                        node.alternate.type !== 'BlockStatement' &&
                        node.alternate.type !== 'IfStatement'
                    ) {
                        context.report({
                            node: node.alternate,
                            message: 'Add curly braces to else statement.',
                            fix(fixer) {
                                const sourceCode = context.sourceCode
                                const text = sourceCode.getText(node.alternate)
                                return fixer.replaceText(node.alternate, `{ ${text} }`)
                            },
                        })
                    }
                },
                ForStatement(node) {
                    if (node.body && node.body.type !== 'BlockStatement') {
                        context.report({
                            node: node.body,
                            message: 'Add curly braces to for loop.',
                            fix(fixer) {
                                const sourceCode = context.sourceCode
                                const text = sourceCode.getText(node.body)
                                return fixer.replaceText(node.body, `{ ${text} }`)
                            },
                        })
                    }
                },
                WhileStatement(node) {
                    if (node.body && node.body.type !== 'BlockStatement') {
                        context.report({
                            node: node.body,
                            message: 'Add curly braces to while loop.',
                            fix(fixer) {
                                const sourceCode = context.sourceCode
                                const text = sourceCode.getText(node.body)
                                return fixer.replaceText(node.body, `{ ${text} }`)
                            },
                        })
                    }
                },
            }
        },
    },
}
