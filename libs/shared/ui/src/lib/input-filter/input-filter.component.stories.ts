import type { Meta, StoryObj } from '@storybook/angular';
import { InputFilterComponent } from './input-filter.component';

const meta: Meta<InputFilterComponent> = {
  component: InputFilterComponent,
  title: 'atoms/InputFilterComponent',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<InputFilterComponent>;

export const Primary: Story = {
  args: {
    title: 'Search',
  },
};
