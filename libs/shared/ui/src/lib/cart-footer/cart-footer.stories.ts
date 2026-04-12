import type { Meta, StoryObj } from '@storybook/angular';
import { ChCartFooter } from './cart-footer';

const meta: Meta<ChCartFooter> = {
  component: ChCartFooter,
  title: 'Molecules/ChCartFooter',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<ChCartFooter>;

export const Primary: Story = {
  args: {},
};
