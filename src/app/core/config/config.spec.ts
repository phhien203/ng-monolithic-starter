import { TestBed } from '@angular/core/testing';

import { ConfigService } from '@core/config/config';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads and exposes the application configuration', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      jsonResponse({
        sentryDSN: 'https://public-key@example.ingest.sentry.io/1',
        apiBaseURL: 'https://api.example.com',
        futureProperty: true,
      }),
    );

    await service.load();

    expect(service.sentryDSN).toBe('https://public-key@example.ingest.sentry.io/1');
    expect(service.apiBaseURL).toBe('https://api.example.com');
    expect(service.config).toMatchObject({ futureProperty: true });
    expect(fetch).toHaveBeenCalledWith('/config.json', { cache: 'no-store' });
  });

  it('throws when configuration is accessed before it is loaded', () => {
    expect(() => service.config).toThrow('Application configuration has not been loaded.');
  });

  it('rejects a configuration with missing required properties', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(jsonResponse({ sentryDSN: '' }));

    await expect(service.load()).rejects.toThrow(
      'Invalid /config.json: "apiBaseURL" must be a string.',
    );
  });
});

function jsonResponse(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json' },
  });
}
