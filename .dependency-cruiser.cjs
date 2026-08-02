/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [],
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    includeOnly: '^src/app/',
    tsConfig: {
      fileName: 'tsconfig.json',
    },
    tsPreCompilationDeps: true,
  },
};
