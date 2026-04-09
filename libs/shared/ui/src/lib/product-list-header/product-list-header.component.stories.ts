import type { Meta, StoryObj } from '@storybook/angular';
import { ProductListHeaderComponent } from './product-list-header.component';

const meta: Meta<ProductListHeaderComponent> = {
  title: 'Molecules/ProductListHeader',
  component: ProductListHeaderComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ProductListHeaderComponent>;

export const Default: Story = {
  args: {
    title: 'Productos',
    gridView: true,
    showFilters: true,
  },
};
