import type { Meta, StoryObj } from '@storybook/angular';
import { CardSkeleton } from './product-card-skeleton.component';

const meta: Meta<CardSkeleton> = {
  title: 'Molecules/CardSkeleton',
  component: CardSkeleton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<CardSkeleton>;

export const Default: Story = {};
