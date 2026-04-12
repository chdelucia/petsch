import type { Meta, StoryObj } from '@storybook/angular';
import { ChCardSkeleton } from './product-card-skeleton.component';

const meta: Meta<ChCardSkeleton> = {
  title: 'Molecules/ChCardSkeleton',
  component: ChCardSkeleton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ChCardSkeleton>;

export const Default: Story = {};
