import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {

  bookId: number | null = null;
  book: any
  constructor(private route: ActivatedRoute,
    private readonly bookListService: BookService,
  ) { }

  ngOnInit(): void {
    const variab = this.route.snapshot.paramMap.get('id');
    if (variab != null) {
      this.bookId = parseInt(variab);
      this.bookListService.getBookById(this.bookId).subscribe({
        next: (book) => {
          this.book = book
        },
      })
    }
  }

}
