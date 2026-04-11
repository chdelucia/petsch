import type { Meta, StoryObj } from '@storybook/angular';
import { Card } from './product-card.component';
import { provideRouter } from '@angular/router';
import { applicationConfig } from '@storybook/angular';

const meta: Meta<Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
};

export default meta;

type Story = StoryObj<Card>;

export const Default: Story = {
  args: {
    id: 1,
    name: 'Product Name',
    imageUrl: 'https://placehold.co/600x400',
    viewTransitionName: '',
  },
};
