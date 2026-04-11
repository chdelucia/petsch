import type { Meta, StoryObj } from '@storybook/angular';
import { CartItem } from './cart-item';

const meta: Meta<CartItem> = {
  component: CartItem,
  title: 'Molecules/CartItem',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<CartItem>;

export const Primary: Story = {
  args: {
    name: 'Throwback Hip Bag',
    color: 'Salmon',
    imageSrc: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
};
