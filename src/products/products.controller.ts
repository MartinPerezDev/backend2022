import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    const product = this.productsService.create(createProductDto);
    return { message: 'create product', data: product };
  }

  @Get()
  findAll() {
    const products = this.productsService.findAll();
    return { message: 'get all products', data: products };
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    const product = this.productsService.findOne(+id);
    return { message: 'get product by id', data: product };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const updatedProduct = this.productsService.update(+id, updateProductDto);
    return { message: 'updated product', data: updatedProduct };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const productsNoDeleted = this.productsService.remove(+id);
    return { message: 'deleted product', data: productsNoDeleted };
  }
}
