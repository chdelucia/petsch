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
    titleLabel: 'Item of the day',
    showFooter: true,
  },
};

export const Left: Story = {
  args: {
    open: true,
    titleLabel: 'Filters',
    showFooter: true,
    position: 'left',
  },
};
