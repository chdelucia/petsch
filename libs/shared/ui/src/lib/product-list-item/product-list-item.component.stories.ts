import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { ProductListItemComponent } from './product-list-item.component';

const meta: Meta<ProductListItemComponent> = {
  component: ProductListItemComponent,
  title: 'Molecules/ProductListItem',
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
};

export default meta;

type Story = StoryObj<ProductListItemComponent>;

export const Primary: Story = {
  args: {
    id: 1,
    name: 'Product Name',
    description: 'This is a product description.',
    imageUrl: 'https://via.placeholder.com/150',
  },
};
