import type { Meta, StoryObj } from '@storybook/angular';
import { CartItem } from './cart-item';

const meta: Meta<CartItem> = {
  component: CartItem,
  title: 'Molecule/CartItem',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<CartItem>;

export const Primary: Story = {
  args: {
    name: 'Throwback Hip Bag',
    price: 90.99,
    color: 'Salmon',
    quantity: 1,
    imageSrc: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    imageAlt: 'test foto'
  },
};
