import { Directive, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const inputGroupAddonVariants = cva(
  "text-muted-foreground **:data-[slot=kbd]:bg-muted-foreground/10 flex h-auto cursor-text items-center justify-center gap-1 py-2 text-xs/relaxed font-medium select-none group-data-[disabled=true]/input-group:opacity-50 **:data-[slot=kbd]:rounded-[calc(var(--radius-sm)-2px)] **:data-[slot=kbd]:px-1 **:data-[slot=kbd]:text-[0.625rem] [&>ng-icon:not([class*='text-'])]:text-[length:--spacing(3.5)]",
  {
    variants: {
      align: {
        'inline-start': 'order-first ps-2 has-[>button]:ms-[-0.275rem] has-[>kbd]:ms-[-0.275rem]',
        'inline-end': 'order-last pe-2 has-[>button]:me-[-0.275rem] has-[>kbd]:me-[-0.275rem]',
        'block-start':
          'order-first w-full justify-start px-2 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2',
        'block-end':
          'order-last w-full justify-start px-2 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
);

type InputGroupAddonVariants = VariantProps<typeof inputGroupAddonVariants>;

@Directive({
  selector: '[hlmInputGroupAddon],hlm-input-group-addon',
  host: {
    role: 'group',
    'data-slot': 'input-group-addon',
    '[attr.data-align]': 'align()',
  },
})
export class HlmInputGroupAddon {
  public readonly align = input<InputGroupAddonVariants['align']>('inline-start');

  constructor() {
    classes(() => inputGroupAddonVariants({ align: this.align() }));
  }
}
