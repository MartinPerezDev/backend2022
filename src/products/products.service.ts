import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  products: Array<Product>;
  constructor() {
    this.products = [];
  }

  create(createProductDto: CreateProductDto) {
    const newProduct = { id: this.generateId(), ...createProductDto };
    this.products = [...this.products, newProduct];
    return newProduct;
  }

  findAll(): Array<Product> {
    return this.products;
  }

  findOne(id: number): Product {
    return this.getId(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const previousProduct = this.getId(id);
    const product: Product = {
      ...previousProduct,
      ...updateProductDto,
    };
    this.products = this.products.map((item: Product) =>
      item.id === id ? product : item,
    );
    return product;
  }

  remove(id: number) {
    this.getId(id);
    this.products = this.products.filter((item) => item.id !== id);
    return this.products;
  }

  generateId(): number {
    return this.products.length === 0
      ? 1
      : this.products[this.products.length - 1].id + 1;
  }

  getId(id: number): Product {
    const product = this.products.find((item: Product) => item.id === id);
    if (product) {
      return product;
    } else {
      throw new NotFoundException(`Not Found this product ${id}`);
    }
  }
}
