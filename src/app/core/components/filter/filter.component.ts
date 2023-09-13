import { Component, EventEmitter, Output } from '@angular/core';
import productType from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

type CategoryType = { label: string; value: string };

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Output() searchResult: EventEmitter<productType[] | []> = new EventEmitter();

  // searchResult: undefined | productType[];
  CATEGORIES: CategoryType[] = [
    {
      label: 'Apple',
      value: 'apple',
    },
    {
      label: 'Samsung',
      value: 'samsung',
    },
    {
      label: 'oppo',
      value: 'Oppo',
    },
    {
      label: 'Huawei',
      value: 'huawei',
    },
    {
      label: 'Xiaomi',
      value: 'xiaomi',
    },
  ];

  searchForm: FormGroup = new FormGroup({
    searchBar: new FormControl(''),
    priceMin: new FormControl(''),
    priceMax: new FormControl(''),
    category: new FormControl(''),
  });

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchBar: [''],
      priceMin: [''],
      priceMax: [''],
      category: [''],
    });
  }

  onFilter() {
    const { searchBar, priceMin, priceMax, category } = this.searchForm.value;

    if (!searchBar && !priceMax && !priceMin && !category) return;
    const query = `searchBar=${searchBar}&priceMin=${priceMin}&priceMax=${priceMax}&category=${category}`;

    this.productService.searchProduct(query).subscribe((res) => {
      // this.searchResult = res;
      this.searchResult.emit(res);
    });
  }
}
