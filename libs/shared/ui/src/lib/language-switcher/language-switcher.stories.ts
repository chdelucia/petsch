import type { Meta, StoryObj } from '@storybook/angular';
import { ChLanguageSwitcher, LanguageOption } from './language-switcher';

const meta: Meta<ChLanguageSwitcher> = {
  title: 'Molecules/LanguageSwitcher',
  component: ChLanguageSwitcher,
  tags: ['autodocs'],
  argTypes: {
    languages: { control: 'object' },
    selected: { control: 'text' },
    languageSelected: { action: 'languageSelected' },
  },
};

export default meta;

type Story = StoryObj<ChLanguageSwitcher>;

const defaultLanguages: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

export const Default: Story = {
  args: {
    languages: defaultLanguages,
    selected: 'en',
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-ch-ui-language-switcher
        [languages]="languages"
        [selected]="selected"
        (languageSelected)="languageSelected($event)"
      ></lib-ch-ui-language-switcher>
    `,
  }),
};
