import type { Meta, StoryObj } from '@storybook/angular';
import { ChCartDrawer } from './cart-drawer';

const meta: Meta<ChCartDrawer> = {
  component: ChCartDrawer,
  title: 'Organisms/ChCartDrawer',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<ChCartDrawer>;

export const Primary: Story = {
  args: {
    open: true,
    titleLabel: 'Pet of the day',
    showFooter: true,
  },
};
