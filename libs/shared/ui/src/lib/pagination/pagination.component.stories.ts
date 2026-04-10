import type { Meta, StoryObj } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';

const meta: Meta<PaginationComponent> = {
  component: PaginationComponent,
  title: 'Molecules/PaginationComponent',
};
export default meta;

type Story = StoryObj<PaginationComponent>;

export const Primary: Story = {
  args: {
    page: 2,
    totalPages: 10,
  },
};
