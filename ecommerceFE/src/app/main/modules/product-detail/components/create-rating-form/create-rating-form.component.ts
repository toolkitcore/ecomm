import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-rating-form',
  templateUrl: './create-rating-form.component.html',
  styleUrls: ['./create-rating-form.component.scss']
})
export class CreateRatingFormComponent implements OnInit {
  isVisible = false;
  ratingForm!: FormGroup;
  fileName!: string;
  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.ratingForm = new FormGroup(
      {
        name: new FormControl(''),
        tel: new FormControl(''),
        image: new FormControl(null),
        comment: new FormControl(''),
        rate: new FormControl(0)
      }
    );
  }

  handleFileInput(event: Event) {
    const target = event.target as any;
    const file = target.files.item(0) as File;
    this.ratingForm.patchValue({image: file});
    this.fileName = file.name;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
