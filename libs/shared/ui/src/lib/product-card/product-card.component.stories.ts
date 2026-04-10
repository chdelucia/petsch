import type { Meta, StoryObj } from '@storybook/angular';
import { ProductCardComponent } from './product-card.component';
import { provideRouter } from '@angular/router';
import { applicationConfig } from '@storybook/angular';

const meta: Meta<ProductCardComponent> = {
  title: 'Molecules/ProductCard',
  component: ProductCardComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
};

export default meta;

type Story = StoryObj<ProductCardComponent>;

export const Default: Story = {
  args: {
    id: 1,
    name: 'Product Name',
    imageUrl: 'https://placehold.co/600x400',
    categoryName: 'Category Name',
    viewTransitionName: '',
  },
};
