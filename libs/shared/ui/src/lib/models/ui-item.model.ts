export interface UiItem {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  creationAt: Date;
  categoryName?: string;
}
