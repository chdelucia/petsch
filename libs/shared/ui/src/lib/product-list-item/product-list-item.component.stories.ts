import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ProductListItemComponent } from './product-list-item.component';
import { provideRouter } from '@angular/router';

const meta: Meta<ProductListItemComponent> = {
  component: ProductListItemComponent,
  title: 'Molecules/ProductListItem',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      providers: [provideRouter([])],
    }),
  ],
};
export default meta;

type Story = StoryObj<ProductListItemComponent>;

export const Primary: Story = {
  args: {
    id: '1',
    name: 'Product Name',
    title: 'Product Title',
    description: 'This is a product description.',
    price: 99.99,
    imageUrl: 'https://via.placeholder.com/150',
    creationAt: new Date(),
  },
};
