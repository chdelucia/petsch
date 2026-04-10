import type { Meta, StoryObj } from '@storybook/angular';
import { ProductListViewComponent } from './product-list-view.component';
import { provideRouter } from '@angular/router';
import { applicationConfig } from '@storybook/angular';

const meta: Meta<ProductListViewComponent> = {
  title: 'Organisms/ProductListView',
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
        imageUrl: 'https://placehold.co/100',
        categoryName: 'Cat 1',
        creationAt: new Date(),
      },
      {
        id: '2',
        name: 'Product 2',
        title: 'Title 2',
        description: 'Description 2',
        price: 20,
        imageUrl: 'https://placehold.co/100',
        categoryName: 'Cat 2',
        creationAt: new Date(),
      },
    ],
  },
};
