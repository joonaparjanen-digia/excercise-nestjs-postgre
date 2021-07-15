import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageDirectory: '../coverage',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^#api/(.*)$': `<rootDir>/src/api/$1`,
		'#types': `<rootDir>/src/types`,
		'#jest-mocks': `<rootDir>/mocks`,
	},
}
export default config
