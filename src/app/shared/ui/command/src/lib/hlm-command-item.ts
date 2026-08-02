import { Directive } from '@angular/core';
import { BrnCommandItem } from '@spartan-ng/brain/command';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
  selector: 'button[hlmCommandItem],button[hlm-command-item]',
  hostDirectives: [
    {
      directive: BrnCommandItem,
      inputs: ['value', 'disabled', 'id'],
      outputs: ['selected'],
    },
  ],
  host: {
    'data-slot': 'command-item',
  },
})
export class HlmCommandItem {
  constructor() {
    classes(
      () =>
        "data-selected:bg-muted data-selected:text-foreground group/command-item relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-md px-2.5 py-1.5 text-xs/relaxed outline-hidden select-none in-data-[slot=dialog-content]:rounded-md data-disabled:pointer-events-none data-disabled:opacity-50 data-hidden:hidden [&_ng-icon:not([class*='text-'])]:text-[length:--spacing(3.5)] [&>ng-icon]:pointer-events-none [&>ng-icon]:shrink-0",
    );
  }
}
