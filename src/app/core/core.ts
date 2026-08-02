import {
  ErrorHandler,
  Injector,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  Router,
  Routes,
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import * as Sentry from '@sentry/angular';

import { ConfigService } from '@core/config/config';

export interface CoreOptions {
  routes: Routes;
}

export function provideCore({ routes }: CoreOptions) {
  return [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withComponentInputBinding(),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler(),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    provideAppInitializer(async () => {
      const configService = inject(ConfigService);
      const injector = inject(Injector);

      return configService.load().then(() => {
        initializeSentry(configService);
        injector.get(Sentry.TraceService);
      });
    }),
  ];
}

function initializeSentry(configService: ConfigService): void {
  if (!configService.sentryDSN) {
    return;
  }

  Sentry.init({
    dsn: configService.sentryDSN,
    dataCollection: {},
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost', configService.apiBaseURL],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    enableLogs: true,
  });
}
