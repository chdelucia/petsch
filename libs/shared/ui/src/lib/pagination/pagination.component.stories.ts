import type { Meta, StoryObj } from '@storybook/angular';
import { ChPagination } from './pagination.component';

const meta: Meta<ChPagination> = {
  component: ChPagination,
  title: 'Molecules/ChPagination',
};
export default meta;

type Story = StoryObj<ChPagination>;

export const Primary: Story = {
  args: {
    page: 2,
    totalPages: 10,
  },
};
