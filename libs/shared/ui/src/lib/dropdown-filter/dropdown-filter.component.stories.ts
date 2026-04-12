import type { Meta, StoryObj } from '@storybook/angular';
import { ChDropdownFilter } from './dropdown-filter.component';

const meta: Meta<ChDropdownFilter> = {
  component: ChDropdownFilter,
  title: 'atoms/DropdownFilter',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<ChDropdownFilter>;

export const Primary: Story = {
  args: {
    options: [
      { key: 'id', order: 'asc', text: 'Most Popular' },
      { key: 'name', order: 'asc', text: 'Name: Asc' },
      { key: 'name', order: 'desc', text: 'Name: Desc' },
      { key: 'weight', order: 'asc', text: 'Weight: Asc' },
      { key: 'weight', order: 'desc', text: 'Weight: Desc' },
    ],
  },
};
