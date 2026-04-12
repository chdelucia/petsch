import type { Meta, StoryObj } from '@storybook/angular';
import { ChInputFilter } from './input-filter.component';

const meta: Meta<ChInputFilter> = {
  component: ChInputFilter,
  title: 'atoms/ChInputFilter',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<ChInputFilter>;

export const Primary: Story = {
  args: {
    title: 'Search',
  },
};
