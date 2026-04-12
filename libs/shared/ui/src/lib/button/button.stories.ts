import type { Meta, StoryObj } from '@storybook/angular';
import { ChButton } from './button';

const meta: Meta<ChButton> = {
  title: 'Atoms/ChButton',
  component: ChButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'link'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<ChButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    fullWidth: false,
    disabled: false,
  },
  render: (args) => ({
    props: {
      ...args,
      click: () => console.log('Primary clicked'),
    },
    template: `
      <lib-ch-ui-button
        [variant]="variant"
        [fullWidth]="fullWidth"
        [disabled]="disabled"
        (click)="click()"
      >
        Checkout
      </lib-ch-ui-button>
    `,
  }),
};

export const PrimaryFullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
    disabled: false,
  },
  render: (args) => ({
    props: {
      ...args,
      click: () => console.log('Checkout clicked'),
    },
    template: `
      <div style="width: 300px;">
        <lib-ch-ui-button
          [variant]="variant"
          [fullWidth]="fullWidth"
          [disabled]="disabled"
          (click)="click()"
        >
          Checkout
        </lib-ch-ui-button>
      </div>
    `,
  }),
};

export const Link: Story = {
  args: {
    variant: 'link',
    fullWidth: false,
    disabled: false,
  },
  render: (args) => ({
    props: {
      ...args,
      click: () => console.log('Continue Shopping clicked'),
    },
    template: `
      <lib-ch-ui-button
        [variant]="variant"
        [disabled]="disabled"
        (click)="click()"
      >
        Continue Shopping →
      </lib-ch-ui-button>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    fullWidth: false,
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-ch-ui-button
        [variant]="variant"
        [fullWidth]="fullWidth"
        [disabled]="disabled"
      >
        Disabled ChButton
      </lib-ch-ui-button>
    `,
  }),
};
