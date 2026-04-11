import type { Meta, StoryObj } from '@storybook/angular';
import { RadioFilter } from './radio-filter.component';

const meta: Meta<RadioFilter> = {
  component: RadioFilter,
  title: 'atoms/RadioFilter',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<RadioFilter>;

export const Primary: Story = {
  args: {
    title: 'Gender',
    options: [
      { value: 'female', text: 'CharacterGender.FEMALE' },
      { value: 'male', text: 'CharacterGender.MALE' },
      { value: 'genderless', text: 'CharacterGender.GENDERLESS' },
      { value: 'unknown', text: 'CharacterGender.UNKNOWN' },
    ],
  },
};
