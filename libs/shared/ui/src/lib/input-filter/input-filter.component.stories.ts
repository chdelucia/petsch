import type { Meta, StoryObj } from '@storybook/angular';
import { InputFilter } from './input-filter.component';

const meta: Meta<InputFilter> = {
  component: InputFilter,
  title: 'atoms/InputFilter',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<InputFilter>;

export const Primary: Story = {
  args: {
    title: 'Search',
  },
};
