import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Book } from '../entity/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatTableModule, MatCheckboxModule, MatButtonModule],
  styleUrls: ['./book.component.scss'],
  providers: [BookService]
})
export class BookComponent implements OnInit {

  books!: MatTableDataSource<Book>;
  selectionOfBook: SelectionModel<Book>;
  displayedColumns: string[] = ['select', 'title', 'author', 'price'];

  constructor(private readonly bookListService: BookService,
  ) {
    this.selectionOfBook = new SelectionModel<Book>(true, [])
  }

  ngOnInit() {
    this.getAllBooks()
  }

  /**
   * method use to get all books
   */
  getAllBooks() {
    this.bookListService.getAllBooks().subscribe({
      next: (books) => {
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
