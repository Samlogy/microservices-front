import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ShippingService } from 'src/app/core/services/shipping/shipping.service';
import Swal from 'sweetalert2';

enum orderStatus {
  PENDING,
  CONFIRMED,
  SHIPPING,
  ARRIVED,
}

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent implements OnInit {
  apiLoading: boolean = false;

  shippingForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    address: new FormControl(''),
    contact: new FormControl(''),
  });

  constructor(
    private shippingService: ShippingService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      address: ['', [Validators.required]],
      contact: ['', [Validators.required]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.shippingForm.controls;
  }

  onShipping(): void {
    this.apiLoading = true;
    if (this.shippingForm.invalid) return;

    // console.log(JSON.stringify(this.shippingForm.value, null, 2));

    this.shippingService.addShipping(this.shippingForm.value).subscribe(
      (res) => {
        this.apiLoading = false;

        Swal.fire({
          title: 'Succés',
          text: 'Shipping details were added successfully ',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.router.navigate(['/orders']);
      },
      (err) => {
        this.apiLoading = false;
        Swal.fire({
          title: 'Erreur!',
          text: err.error.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
  onCancel() {
    this.router.navigate(['/products']);
  }
}
