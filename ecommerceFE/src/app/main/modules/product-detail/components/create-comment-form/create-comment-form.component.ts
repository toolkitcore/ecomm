import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-comment-form',
  templateUrl: './create-comment-form.component.html',
  styleUrls: ['./create-comment-form.component.scss']
})
export class CreateCommentFormComponent implements OnInit {
  isVisible = false;
  commentForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.commentForm = new FormGroup(
      {
        fullName: new FormControl('', [Validators.required]),
        email: new FormControl('')
      }
    );
  }
}
