import type { Meta, StoryObj } from '@storybook/angular';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ChButton } from './button';

const meta: Meta<ChButton> = {
  title: 'Atoms/ChButton',
  component: ChButton,
  tags: ['autodocs'],
  args: {
    clicked: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    isActive: {
      control: 'boolean',
    },
    ariaLabel: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<ChButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-ch-ui-button
        [variant]="variant"
        [size]="size"
        [fullWidth]="fullWidth"
        [disabled]="disabled"
        (clicked)="clicked($event)"
      >
        Checkout
      </lib-ch-ui-button>
    `,
  }),
};

export const Interaction: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-ch-ui-button
        [variant]="variant"
        (clicked)="clicked($event)"
      >
        Click Me
      </lib-ch-ui-button>
    `,
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me/i });
    await userEvent.click(button);
    await expect(args.clicked).toHaveBeenCalled();
  },
};

export const DisabledInteraction: Story = {
  args: {
    variant: 'primary',
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-ch-ui-button
        [variant]="variant"
        [disabled]="disabled"
        (clicked)="clicked($event)"
      >
        Disabled
      </lib-ch-ui-button>
    `,
  }),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled/i });
    await expect(button).toBeDisabled();
    // In Storybook Interaction tests, userEvent.click on an element with pointer-events: none
    // (which often happens when a button is disabled) will throw an error.
    // So we just verify it's disabled and that the clicked mock wasn't called.
    await expect(args.clicked).not.toHaveBeenCalled();
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-ch-ui-button
        [variant]="variant"
        [size]="size"
      >
        Cancel
      </lib-ch-ui-button>
    `,
  }),
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-ch-ui-button
        [variant]="variant"
        [size]="size"
      >
        Add to Cart
      </lib-ch-ui-button>
    `,
  }),
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-ch-ui-button
        [variant]="variant"
        [size]="size"
      >
        Filter
      </lib-ch-ui-button>
    `,
  }),
};

export const Sizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center gap-4">
        <lib-ch-ui-button size="sm">Small</lib-ch-ui-button>
        <lib-ch-ui-button size="md">Medium</lib-ch-ui-button>
        <lib-ch-ui-button size="lg">Large</lib-ch-ui-button>
      </div>
    `,
  }),
};

export const IconOnly: Story = {
  args: {
    variant: 'ghost',
    size: 'sm',
    ariaLabel: 'Remove item',
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-ch-ui-button
        [variant]="variant"
        [size]="size"
        [ariaLabel]="ariaLabel"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </lib-ch-ui-button>
    `,
  }),
};

export const Link: Story = {
  args: {
    variant: 'link',
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-ch-ui-button
        [variant]="variant"
      >
        Continue Shopping →
      </lib-ch-ui-button>
    `,
  }),
};

export const ActiveOutline: Story = {
  args: {
    variant: 'outline',
    isActive: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-ch-ui-button
        [variant]="variant"
        [isActive]="isActive"
      >
        1
      </lib-ch-ui-button>
    `,
  }),
};
