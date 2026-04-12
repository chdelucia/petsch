import type { Meta, StoryObj } from '@storybook/angular';
import { ChRadioFilter } from './radio-filter.component';

const meta: Meta<ChRadioFilter> = {
  component: ChRadioFilter,
  title: 'atoms/ChRadioFilter',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<ChRadioFilter>;

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
