import { Component } from '@angular/core';
import productType from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  searchResult: undefined | productType[];

  searchForm: FormGroup = new FormGroup({
    searchBar: new FormControl(''),
  });
  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchBar: ['', Validators.required],
    });
  }

  onFilter() {
    if (this.searchForm.invalid) return;

    console.log(JSON.stringify(this.searchForm.value, null, 2));
  }

  searchProduct(query: KeyboardEvent) {
    if (!query) return;
    const element = query.target as HTMLInputElement;
    this.productService.searchProduct(element.value).subscribe((result) => {
      if (result.length > 5) {
        result.length = length;
      }
      this.searchResult = result;
    });
  }
}
