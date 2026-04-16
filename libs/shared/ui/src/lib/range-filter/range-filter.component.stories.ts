import type { Meta, StoryObj } from '@storybook/angular';
import { ChRangeFilter } from './range-filter.component';

const meta: Meta<ChRangeFilter> = {
  component: ChRangeFilter,
  title: 'atoms/ChRangeFilter',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<ChRangeFilter>;

export const Primary: Story = {
  args: {
    title: 'Weight Range',
    testId: 'weight-range',
  },
};
