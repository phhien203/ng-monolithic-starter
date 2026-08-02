import { inject, Injectable } from '@angular/core';

import { ConfigService } from '@core/config/config';

@Injectable()
export class GeneralSettingsApi {
  private readonly config = inject(ConfigService);
  private readonly baseURL = this.config.apiBaseURL;

  constructor() {
    console.log({ baseURL: this.baseURL });
  }
}
