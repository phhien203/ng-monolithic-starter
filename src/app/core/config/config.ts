import { Service } from '@angular/core';

export interface AppConfig {
  readonly sentryDSN: string;
  readonly apiBaseURL: string;
}

@Service()
export class ConfigService {
  private loadedConfig: AppConfig | undefined;

  get config(): AppConfig {
    if (!this.loadedConfig) {
      throw new Error('Application configuration has not been loaded.');
    }

    return this.loadedConfig;
  }

  get sentryDSN(): string {
    return this.config.sentryDSN;
  }

  get apiBaseURL(): string {
    return this.config.apiBaseURL;
  }

  async load(): Promise<void> {
    const response = await fetch('/config.json', { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Unable to load /config.json: ${response.status} ${response.statusText}`);
    }

    const config: unknown = await response.json();
    this.loadedConfig = parseConfig(config);
  }
}

function parseConfig(value: unknown): AppConfig {
  if (!isRecord(value)) {
    throw new Error('Invalid /config.json: expected a JSON object.');
  }

  assertStringProperty(value, 'sentryDSN');
  assertStringProperty(value, 'apiBaseURL');

  return Object.freeze({
    ...value,
    sentryDSN: value['sentryDSN'],
    apiBaseURL: value['apiBaseURL'],
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function assertStringProperty(
  value: Record<string, unknown>,
  property: string,
): asserts value is Record<string, unknown> & Record<typeof property, string> {
  if (typeof value[property] !== 'string') {
    throw new Error(`Invalid /config.json: "${property}" must be a string.`);
  }
}
