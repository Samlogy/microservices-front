import { Component, EventEmitter, Output } from '@angular/core';
import { productType, productsListType } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

type categoryType = { label: string; value: string };

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Output() searchResult = new EventEmitter<productsListType>();

  CATEGORIES: categoryType[] = [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Samsung',
      value: 'samsung',
    },
    {
      label: 'Oppo',
      value: 'oppo',
    },
    {
      label: 'Huawei',
      value: 'huawei',
    },
  ];
  SORT_ORDER = ['asc', 'desc'];

  searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
    priceMin: new FormControl(''),
    priceMax: new FormControl(''),
    sort_order: new FormControl(''),
  });

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      name: [''],
      category: [''],
      priceMin: [10],
      priceMax: [''],
      sort_order: ['asc'],
    });
  }

  onFilter() {
    const { category, name, priceMin, priceMax, sort_order } =
      this.searchForm.value;

    const query = `name=${name}&category=${category}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sort_order}`;

    console.log(JSON.stringify(this.searchForm.value, null, 2));

    this.productService.searchProduct(query).subscribe((res) => {
      this.searchResult.emit(res);
    });
  }
}
