module.exports = {
    mode: 'file',
    logger: 'none',
    target: 'ES6',
    experimentalDecorators: true,
    module: 'CommonJS',
    out: 'docs',
    name: 'RGAC',
    gitRevision: 'master',
    excludeNotExported: true,
    excludePrivate: true,
    excludeProtected: true,
};
