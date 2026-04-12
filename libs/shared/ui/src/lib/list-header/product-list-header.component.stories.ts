import type { Meta, StoryObj } from '@storybook/angular';
import { ListHeader } from './product-list-header.component';

const meta: Meta<ListHeader> = {
  title: 'Molecules/ListHeader',
  component: ListHeader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ListHeader>;

export const Default: Story = {
  args: {
    text: 'Productos',
    showFilters: true,
  },
};
