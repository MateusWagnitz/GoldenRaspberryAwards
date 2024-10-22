module.exports = {
  preset: 'ts-jest',
  projects: [
    {
      displayName: 'services',
      testEnvironment: 'node',
      testMatch: ['**/*.test.ts'],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
    },
    {
      displayName: 'components',
      testEnvironment: 'jsdom',
      testMatch: ['**/*.test.tsx'],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
      setupFilesAfterEnv: ['./jest.setup.ts'],
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      },
    },
  ],
};