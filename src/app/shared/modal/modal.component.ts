import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, pluck, map, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  searchControl: FormControl = new FormControl;  

  constructor(private _router: Router) { 
    this.searchControl.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged(),
      switchMap(value => {
        return this._router.navigate(['/search', value.toLowerCase()]);
      }),
    ).subscribe(console.log);
  }

  ngOnInit(): void {
  }

}
