module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^(modules|core|configuration|packages)/(.*)$': '<rootDir>/src/$1/$2',
    '^(main|travel|literature|code|auth)/(.*)$': '<rootDir>/src/packages/$1/$2',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { rootMode: 'upward' }],
  },
};
