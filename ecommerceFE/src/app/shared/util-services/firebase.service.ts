import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private readonly fireStorage: AngularFireStorage) { }

  private handleUploadFileToFirebase(fileToUpload: File, folderName: string): { task: AngularFireUploadTask; fileRef: AngularFireStorageReference } {
    const now = Date.now();
    const nameImg = `${folderName}/${fileToUpload?.name}${now}`;
    const fileRef = this.fireStorage.ref(nameImg);
    const task = this.fireStorage.upload(nameImg, fileToUpload);
    return ({
      task,
      fileRef
    });
  }

  uploadImages(fileToUpload: File): Observable<string> {
    const uploadFirebase = this.handleUploadFileToFirebase(fileToUpload, 'images');
    const fileRef = uploadFirebase.fileRef;
    const task = uploadFirebase.task;
    return from(task).pipe(
      switchMap(() => {
        return fileRef.getDownloadURL();
      })
    );
  }
}
