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
    item: {
      id: '1',
      name: 'Product Name',
      title: 'Product Title',
      description: 'Product Description',
      price: 100,
      images: ['https://placehold.co/600x400'],
      category: { name: 'Category Name' },
      inStock: true,
      rating: 4.5,
      reviewCount: 10,
      slug: 'product-slug',
      creationAt: new Date(),
    },
    viewTransitionName: '',
  },
};
