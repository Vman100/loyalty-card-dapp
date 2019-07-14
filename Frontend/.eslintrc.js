module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "prettier-react"
  ],
  rules: {
    "jsx-a11y/label-has-for": [ 2, {
      required: {
          some: [ "nesting", "id" ]
      }
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    ecmaVersion: 10,
    parser: 'babel-eslint'
  }
}