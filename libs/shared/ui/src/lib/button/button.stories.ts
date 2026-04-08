import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta<Button> = {
  title: 'Atoms/Button',
  component: Button,
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

type Story = StoryObj<Button>;

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
      <lib-ui-button
        [variant]="variant"
        [fullWidth]="fullWidth"
        [disabled]="disabled"
        (click)="click()"
      >
        Checkout
      </lib-ui-button>
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
        <lib-ui-button
          [variant]="variant"
          [fullWidth]="fullWidth"
          [disabled]="disabled"
          (click)="click()"
        >
          Checkout
        </lib-ui-button>
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
      <lib-ui-button
        [variant]="variant"
        [disabled]="disabled"
        (click)="click()"
      >
        Continue Shopping →
      </lib-ui-button>
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
      <lib-ui-button
        [variant]="variant"
        [fullWidth]="fullWidth"
        [disabled]="disabled"
      >
        Disabled Button
      </lib-ui-button>
    `,
  }),
};
