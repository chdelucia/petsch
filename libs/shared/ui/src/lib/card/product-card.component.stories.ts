import type { Meta, StoryObj } from '@storybook/angular';
import { ChCard } from './product-card.component';
import { provideRouter } from '@angular/router';
import { applicationConfig } from '@storybook/angular';

const meta: Meta<ChCard> = {
  title: 'Molecules/ChCard',
  component: ChCard,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
};

export default meta;

type Story = StoryObj<ChCard>;

export const Default: Story = {
  args: {
    id: 1,
    name: 'Product Name',
    imageUrl: 'https://placehold.co/600x400',
    viewTransitionName: '',
  },
};
