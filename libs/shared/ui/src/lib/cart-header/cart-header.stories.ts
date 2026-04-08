import type { Meta, StoryObj } from '@storybook/angular';
import { CartHeader } from './cart-header';

const meta: Meta<CartHeader> = {
  component: CartHeader,
  title: 'CartHeader',
};
export default meta;

type Story = StoryObj<CartHeader>;

export const Primary: Story = {
  args: {},
};
