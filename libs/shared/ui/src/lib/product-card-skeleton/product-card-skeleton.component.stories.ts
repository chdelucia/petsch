import type { Meta, StoryObj } from '@storybook/angular';
import { ProductCardSkeletonComponent } from './product-card-skeleton.component';

const meta: Meta<ProductCardSkeletonComponent> = {
  title: 'Molecules/ProductCardSkeleton',
  component: ProductCardSkeletonComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ProductCardSkeletonComponent>;

export const Default: Story = {};
