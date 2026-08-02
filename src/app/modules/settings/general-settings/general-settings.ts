import { Component } from '@angular/core';
import * as Sentry from '@sentry/angular';

@Component({
  selector: 'app-general-settings',
  imports: [],
  template: `
    <h1>General Settings</h1>
    <button (click)="throwTestError()">Test Sentry Error</button>
  `,
})
export class GeneralSettings {
  public throwTestError(): void {
    // Send a log before throwing the error
    Sentry.logger.info(Sentry.logger.fmt`User ${'sentry-test'} triggered test error button`, {
      action: 'test_error_button_click',
    });
    // Send a test metric before throwing the error
    Sentry.metrics.count('test_counter', 1);
    throw new Error('Sentry Test Error');
  }
}
