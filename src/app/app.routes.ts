import { Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BookDetailsComponent } from './book-details/book-details.component';

export const routes: Routes = [
    { path: '', component: BookComponent },
    { path: 'home', component: BookComponent },
    { path: 'book/:id', component: BookDetailsComponent }
];
