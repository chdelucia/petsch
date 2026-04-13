import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ChBadge } from './badge';

const meta: Meta<ChBadge> = {
  title: 'atoms/Badge',
  component: ChBadge,
  decorators: [
    moduleMetadata({
      imports: [ChBadge],
    }),
  ],
  argTypes: {
    status: {
      control: 'select',
      options: ['unhealthy', 'healthy', 'very healthy'],
    },
  },
};

export default meta;
type Story = StoryObj<ChBadge>;

export const Unhealthy: Story = {
  args: {
    status: 'unhealthy',
  },
  render: (args) => ({
    props: args,
    template: `<lib-ch-ui-badge [status]="status">Unhealthy</lib-ch-ui-badge>`,
  }),
};

export const Healthy: Story = {
  args: {
    status: 'healthy',
  },
  render: (args) => ({
    props: args,
    template: `<lib-ch-ui-badge [status]="status">Healthy</lib-ch-ui-badge>`,
  }),
};

export const VeryHealthy: Story = {
  args: {
    status: 'very healthy',
  },
  render: (args) => ({
    props: args,
    template: `<lib-ch-ui-badge [status]="status">Very Healthy</lib-ch-ui-badge>`,
  }),
};
