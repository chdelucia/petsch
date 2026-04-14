import type { Meta, StoryObj } from '@storybook/angular';
import { ChActiveFiltersComponent } from './active-filters.component';

const meta: Meta<ChActiveFiltersComponent> = {
  component: ChActiveFiltersComponent,
  title: 'atoms/ActiveFilters',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<ChActiveFiltersComponent>;

export const Primary: Story = {
  args: {
    values: {
      name_like: 'Buddy',
      kind: 'dog',
    },
  },
};

export const Empty: Story = {
  args: {
    values: {},
  },
};
