import type { Meta, StoryObj } from '@storybook/angular';
import { RadioFilterComponent } from './radio-filter.component';

const meta: Meta<RadioFilterComponent> = {
  component: RadioFilterComponent,
  title: 'atoms/RadioFilterComponent',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<RadioFilterComponent>;

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
