import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const templateName = 'ng-monolithic-starter';
const templateTitle = 'Angular Monolithic Starter';
const templateRepositoryUrl = 'https://github.com/phhien203/ng-monolithic-starter';
const templateRepositoryUrlPlaceholder = '__TEMPLATE_REPOSITORY_URL__';
const templateOnlySection = /<!-- TEMPLATE-ONLY:START -->[\s\S]*?<!-- TEMPLATE-ONLY:END -->\n*/;
const projectNamePattern = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

const projectName = process.argv[2];
const projectTitle = process.argv[3] ?? toTitleCase(projectName);

if (!projectName || !projectNamePattern.test(projectName)) {
  fail(
    'Usage: pnpm template:init <project-name> ["Project Title"]\n' +
      'The project name must use lowercase kebab-case, for example: customer-portal',
  );
}

if (!projectTitle.trim() || /[\r\n]/.test(projectTitle)) {
  fail('The project title must be a non-empty, single-line value.');
}

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const replacements = new Map([
  ['package.json', replaceTemplateName],
  ['angular.json', replaceTemplateName],
  ['Dockerfile', replaceTemplateName],
  ['src/index.html', replaceTemplateTitle],
  ['README.md', updateReadme],
]);

const packageJson = JSON.parse(await readFile(resolve(repositoryRoot, 'package.json'), 'utf8'));

if (packageJson.name !== templateName) {
  fail(
    `This repository has already been initialized as "${packageJson.name}". ` +
      'The template initializer can only run once.',
  );
}

const pendingWrites = [];

for (const [relativePath, transform] of replacements) {
  const path = resolve(repositoryRoot, relativePath);
  const contents = await readFile(path, 'utf8');
  const updatedContents = transform(contents);

  if (updatedContents === contents) {
    fail(`Expected template value was not found in ${relativePath}. No files were changed.`);
  }

  pendingWrites.push({ path, contents: updatedContents });
}

for (const { path, contents } of pendingWrites) {
  await writeFile(path, contents, 'utf8');
}

console.log(`Initialized ${projectName} (${projectTitle}).`);
console.log('Next steps: pnpm install && pnpm start');

function replaceTemplateName(contents) {
  return contents.replaceAll(templateName, projectName);
}

function replaceTemplateTitle(contents) {
  return contents.replaceAll(templateTitle, projectTitle);
}

function updateReadme(contents) {
  const protectedContents = contents.replaceAll(
    templateRepositoryUrl,
    templateRepositoryUrlPlaceholder,
  );

  return replaceTemplateTitle(replaceTemplateName(protectedContents))
    .replaceAll(templateRepositoryUrlPlaceholder, templateRepositoryUrl)
    .replace(templateOnlySection, '');
}

function toTitleCase(value) {
  return value
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
