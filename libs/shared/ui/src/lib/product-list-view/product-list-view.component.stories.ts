import type { Meta, StoryObj } from '@storybook/angular';
import { ProductListViewComponent } from './product-list-view.component';
import { provideRouter } from '@angular/router';
import { applicationConfig } from '@storybook/angular';

const meta: Meta<ProductListViewComponent> = {
  title: 'Molecules/ProductListView',
  component: ProductListViewComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
};

export default meta;

type Story = StoryObj<ProductListViewComponent>;

export const Default: Story = {
  args: {
    products: [
      {
        id: '1',
        name: 'Product 1',
        title: 'Title 1',
        description: 'Description 1',
        price: 10,
        images: ['https://placehold.co/100'],
        category: { name: 'Cat 1' },
        inStock: true,
        rating: 4,
        reviewCount: 5,
        slug: 'slug-1',
        creationAt: new Date(),
      },
      {
        id: '2',
        name: 'Product 2',
        title: 'Title 2',
        description: 'Description 2',
        price: 20,
        images: ['https://placehold.co/100'],
        category: { name: 'Cat 2' },
        inStock: true,
        rating: 5,
        reviewCount: 8,
        slug: 'slug-2',
        creationAt: new Date(),
      },
    ],
  },
};
