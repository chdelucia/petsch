import { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent } from './select.component';

const meta: Meta<SelectComponent> = {
  title: 'Atoms/Select',
  component: SelectComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Default: Story = {
  args: {
    label: 'Select limit',
    options: [
      { value: 5, label: '5' },
      { value: 10, label: '10' },
      { value: 20, label: '20' },
    ],
  },
};

export const WithoutLabel: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
};
