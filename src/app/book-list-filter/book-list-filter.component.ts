import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { Book } from '../entity/Book';
import { FormsModule } from '@angular/forms';
import { DialogData } from '../entity/DialogData';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-book-list-filter',
  templateUrl: './book-list-filter.component.html',
  styleUrls: ['./book-list-filter.component.scss'],
  standalone: true,
  imports: [MatInputModule, FormsModule, MatDialogModule, MatButtonModule],
})
export class BookListFilterComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BookListFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
