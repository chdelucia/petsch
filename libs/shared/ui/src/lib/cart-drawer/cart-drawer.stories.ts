import type { Meta, StoryObj } from '@storybook/angular';
import { CartDrawer } from './cart-drawer';

const meta: Meta<CartDrawer> = {
  component: CartDrawer,
  title: 'Organism/CartDrawer',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<CartDrawer>;

export const Primary: Story = {
  args: {
    subtotal: 59.99,
  },
};
