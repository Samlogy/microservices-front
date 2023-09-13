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
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent implements OnInit {
  submitted: boolean = false;

  shippingForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    address: new FormControl(''),
    contact: new FormControl(''),
    acceptTerms: new FormControl(false),
  });

  constructor(
    private shippingService: ShippingService,
    private storageService: StorageService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.shippingForm.controls;
  }

  onShipping(): void {
    this.submitted = true;
    if (this.shippingForm.invalid) return;

    console.log(JSON.stringify(this.shippingForm.value, null, 2));

    const data = {
      contact: this.shippingForm.value.contact,
      email: this.shippingForm.value.email,
      address: this.shippingForm.value.address,
    };

    const user = this.storageService.onGetItem('user');
    this.shippingService.addShipping(data, user.id).subscribe((result) => {
      console.log('checkout DONE !');
      this.router.navigate(['/order']);
    });
  }
}
