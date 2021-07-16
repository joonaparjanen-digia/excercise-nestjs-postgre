import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
	detectOpenHandles: true,
	collectCoverage: true,
	verbose: true,
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	collectCoverageFrom: ['src/**/*.ts', '!**/*.module.ts', '!src/types/**/*', '!src/api/main.ts'], // modules are tested seperately in e2e tests
	coverageDirectory: '../coverage',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^#api/(.*)$': '<rootDir>/src/api/$1',
		'#types': '<rootDir>/src/types',
		'#utils': '<rootDir>/src/utils',
		'#jest-mocks': '<rootDir>/mocks',
	},
}
export default config
