export interface TableColumn<T> {
  title: string;
  propertyKey: keyof T;
}
