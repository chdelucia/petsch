import type { Meta, StoryObj } from '@storybook/angular';
import { Pagination } from './pagination.component';

const meta: Meta<Pagination> = {
  component: Pagination,
  title: 'Molecules/Pagination',
};
export default meta;

type Story = StoryObj<Pagination>;

export const Primary: Story = {
  args: {
    page: 2,
    totalPages: 10,
  },
};
