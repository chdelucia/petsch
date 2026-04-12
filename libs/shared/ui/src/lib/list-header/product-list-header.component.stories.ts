import type { Meta, StoryObj } from '@storybook/angular';
import { ChListHeader } from './product-list-header.component';

const meta: Meta<ChListHeader> = {
  title: 'Molecules/ChListHeader',
  component: ChListHeader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ChListHeader>;

export const Default: Story = {
  args: {
    text: 'Productos',
    showFilters: true,
  },
};
