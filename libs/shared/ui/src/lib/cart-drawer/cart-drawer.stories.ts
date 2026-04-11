import type { Meta, StoryObj } from '@storybook/angular';
import { CartDrawer } from './cart-drawer';

const meta: Meta<CartDrawer> = {
  component: CartDrawer,
  title: 'Organisms/CartDrawer',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<CartDrawer>;

export const Primary: Story = {
  args: {
    open: true,
    titleLabel: 'Pet of the day',
    showFooter: true,
  },
};
