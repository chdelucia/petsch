import type { Meta, StoryObj } from '@storybook/angular';
import { CartFooter } from './cart-footer';

const meta: Meta<CartFooter> = {
  component: CartFooter,
  title: 'Molecules/CartFooter',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<CartFooter>;

export const Primary: Story = {
  args: {},
};
