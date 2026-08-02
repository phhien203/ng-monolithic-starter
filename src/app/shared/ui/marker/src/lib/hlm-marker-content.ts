import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: '[hlmMarkerContent],hlm-marker-content',
  host: { 'data-slot': 'marker-content' },
})
export class HlmMarkerContent {
  constructor() {
    classes(
      () =>
        '*:[a]:hover:text-foreground min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3',
    );
  }
}
