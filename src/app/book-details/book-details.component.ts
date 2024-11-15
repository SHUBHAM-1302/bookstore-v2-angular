import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: any
  constructor(private route: ActivatedRoute,
    private readonly bookListService: BookService,
  ) { }

  ngOnInit(): void {
    const variab = this.route.snapshot.paramMap.get('id');
    if (variab != null) {
      const bookId = parseInt(variab);
      this.bookListService.getBookById(bookId).subscribe({
        next: (book) => {
          this.book = book
        },
      })
    }
  }

}
