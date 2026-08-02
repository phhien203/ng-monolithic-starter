import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: '[hlmMessageFooter],hlm-message-footer',
  host: { 'data-slot': 'message-footer' },
})
export class HlmMessageFooter {
  constructor() {
    classes(
      () =>
        'text-muted-foreground flex max-w-full min-w-0 items-center px-2.5 text-[0.625rem] font-medium group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end',
    );
  }
}
