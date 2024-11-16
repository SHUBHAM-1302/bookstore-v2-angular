import { Component, Inject, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Book } from '../entity/Book';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookListFilterComponent } from '../book-list-filter/book-list-filter.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatTableModule, MatCheckboxModule, MatButtonModule, MatDialogModule, MatInputModule, MatIconModule],
  styleUrls: ['./book.component.scss'],
  providers: [BookService]
})
export class BookComponent implements OnInit {

  books!: MatTableDataSource<Book>;
  filtredBookList!: MatTableDataSource<Book>;
  selectionOfBook: SelectionModel<Book>;
  displayedColumns: string[] = ['select', 'title', 'author', 'price'];

  constructor(private readonly bookListService: BookService,
    public dialog: MatDialog
  ) {
    this.selectionOfBook = new SelectionModel<Book>(true, [])
  }

  ngOnInit() {
    this.getAllBooks()
  }


  openDialog() {
    let dialogRef = this.dialog.open(BookListFilterComponent, {

      width: '250px',
      data: { title: null, author: null, price: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.filterBookList(result.title, result.author, result.price)
    });
  }


  filterBookList(title?: string, author?: string, price?: string) {
    if (price) {
      this.books.data.filter(f => f.title == title?.trim() || f.author == author?.trim())
      this.filtredBookList.data = this.books.data.filter(f => Number(f.price.replace(/[^0-9.-]/g, '')) <= parseFloat(price));
    } else {
      this.filtredBookList.data = this.books.data.filter(f => f.title == title?.trim() || f.author == author?.trim())
    }
  }


  /**
   * method use to get all books
   */
  getAllBooks() {
    this.bookListService.getAllBooks().subscribe({
      next: (books) => {
        this.filtredBookList = new MatTableDataSource<Book>(books);
        this.books = new MatTableDataSource<Book>(books);
      },
    })
  }

  /**
   * method use to sold books
   */
  updateStatus() {
    this.selectionOfBook.selected.forEach(f => {
      this.bookListService.updateBook(f.bookId).subscribe({
        next: (value: any) => {
          this.getAllBooks()
        },
      })
    })
  }

  isAllSelected() {
    const numSelected = this.selectionOfBook.selected.length;
    const numRows = this.books.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selectionOfBook.clear() :
      this.books.data.forEach(row => this.selectionOfBook.select(row));
  }

  checkboxLabel(row?: Book): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selectionOfBook.isSelected(row) ? 'deselect' : 'select'} row ${row.bookId + 1}`;
  }

}
