import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ChCartList } from './cart-list';
import { ChCartItem } from '../cart-item/cart-item';

const mockProducts = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    price: 90,
    quantity: 1,
    color: 'Salmon',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    price: 32,
    quantity: 1,
    color: 'Blue',
    imageSrc:
      'https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt: 'Front of satchel with blue canvas body',
  },
];

const meta: Meta<ChCartList> = {
  component: ChCartList,
  title: 'Molecules/ChCartList',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ChCartItem],
    }),
  ],
};
export default meta;

type Story = StoryObj<ChCartList>;

export const Primary: Story = {
  render: () => ({
    props: { products: mockProducts },
    template: `
      <lib-ch-ui-cart-list>
      <ng-container *ngFor="let product of products">
      <li>
        <lib-ch-ui-cart-item
          [imageSrc]="product.imageSrc"
          [imageAlt]="product.imageAlt"
          [name]="product.name"
          [price]="product.price"
          [color]="product.color"
          [quantity]="product.quantity"
          (remove)="console.log('Remove', product.id)"
        ></lib-ch-ui-cart-item>
      </li>
    </ng-container>
      </lib-ch-ui-cart-list>
    `,
  }),
};
