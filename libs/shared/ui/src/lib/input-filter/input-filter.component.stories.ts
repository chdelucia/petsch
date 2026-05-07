import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { expect, userEvent, within } from 'storybook/test';
import { ChInputFilter } from './input-filter.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { ChButton } from '../button/button';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

const meta: Meta<ChInputFilter> = {
  component: ChInputFilter,
  title: 'atoms/ChInputFilter',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ChButton, TranslocoDirective],
      providers: [
        {
          provide: 'TRANSLOCO_CONFIG',
          useValue: {
            availableLangs: ['en'],
            defaultLang: 'en',
          },
        },
        {
          provide: 'TRANSLOCO_LOADER',
          useValue: {
            getTranslation: () => of({ searchByName: 'Search', lastSearches: 'Last Searches' }),
          },
        },
      ],
    }),
  ],
};
export default meta;

type Story = StoryObj<ChInputFilter>;

export const Primary: Story = {
  args: {
    title: 'Search',
  },
};

export const Interaction: Story = {
  args: {
    title: 'Search',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.click(input);
    await userEvent.type(input, 'Angular', { delay: 100 });
    await expect(input).toHaveValue('Angular');
  },
};
