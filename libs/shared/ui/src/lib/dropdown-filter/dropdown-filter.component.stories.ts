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
    sortby: 'id',
    options: [
      { value: 'id', text: 'Most Popular' },
      { value: 'asc', text: 'Name: Asc' },
      { value: 'desc', text: 'Name: Desc' },
      { value: 'gender', text: 'Gender' },
      { value: 'status', text: 'Status' },
    ],
  },
};
