import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

class book {
  id!: number;
  title: string | undefined;;
  rate: string | undefined;;
  auther: string | undefined;;
  isSold: boolean | undefined;;
  check: boolean | undefined;;
  description?: string | undefined;
}
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  standalone: true,  // Mark this as a standalone component
  imports: [CommonModule, RouterModule, ButtonModule, TableModule, CheckboxModule, FormsModule],
  styleUrls: ['./book.component.scss'],
  providers: [BookService]
})
export class BookComponent implements OnInit {

  books!: book[];
  selectedProducts!: any;
  clickd: boolean = false

  constructor(
    private readonly bookListService: BookService,
  ) { }

  ngOnInit() {
    this.getAllBooks()
  }

  getAllBooks() {
    this.bookListService.getAllBooks().subscribe({
      next: (value) => {
        let list = [];
        for (let i = 0; i < value.length; i++) {
          let b = new book();
          b.id = value[i].bookId
          b.auther = value[i].auther
          b.rate = value[i].rate
          b.title = value[i].title
          b.isSold = value[i].isSold
          b.check = false
          if (!value[i].isSold) { list.push(b); }

        }
        this.books = list
      },
    })
  }


  updateStatus() {
    let checkd = this.books.filter(f => f.check == true);
    checkd.forEach(f => {
      let book = {
        "bookId": f.id,
        "title": f.title,
        "auther": f.auther,
        "rate": f.rate,
        "isSold": f.id,
        "description": f.description
      }
      this.bookListService.updateBook(f.id, book).subscribe({
        next: (value: any) => {
          this.getAllBooks()
        },
      })
    })
  }


  selectAll() {
    this.clickd = !this.clickd
    this.books.forEach(f => f.check = this.clickd)
  }
}
