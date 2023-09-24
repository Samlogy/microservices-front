import { Component, OnInit } from '@angular/core';
import userType from 'src/app/core/models/user.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData: userType = {
    fullName: 'sam sam',
    username: 'sam',
    email: 'sam@gmail.com',
    phone: '213 5404918180',
  };
  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    const data = this.storageService.onGetItem('auth-user');
    if (!data) return;
    this.userData = data;
  }
}
