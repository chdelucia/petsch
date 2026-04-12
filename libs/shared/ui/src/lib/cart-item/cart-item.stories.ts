import type { Meta, StoryObj } from '@storybook/angular';
import { ChCartItem } from './cart-item';

const meta: Meta<ChCartItem> = {
  component: ChCartItem,
  title: 'Molecules/ChCartItem',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<ChCartItem>;

export const Primary: Story = {
  args: {
    name: 'Throwback Hip Bag',
    imageSrc: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    description: 'my cat fav'
  },
};
