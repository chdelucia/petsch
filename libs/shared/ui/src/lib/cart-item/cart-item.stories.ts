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
    color: 'Salmon',
    imageSrc: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
};
