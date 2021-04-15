const nxPreset = require('@nrwl/jest/preset');

module.exports = {
    ...nxPreset,
    coverageReporters: ['text', 'html', 'cobertura'],
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: '<rootDir>',
                outputName: 'test-report.xml',
            },
        ],
    ],
    verbose: true,
};
