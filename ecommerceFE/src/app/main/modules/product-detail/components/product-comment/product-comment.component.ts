import { CreateCommentFormComponent } from './../create-comment-form/create-comment-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-comment',
  templateUrl: './product-comment.component.html',
  styleUrls: ['./product-comment.component.scss']
})
export class ProductCommentComponent implements OnInit {
  @ViewChild('createComment') createComment!: CreateCommentFormComponent;
  isOpenReply = false;
  constructor() { }

  ngOnInit(): void {
  }

  postComment(): void {
    this.createComment.isVisible = true;
  }
}
