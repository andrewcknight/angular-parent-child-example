import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit{
  @ViewChild('childDrawer', { static: true }) public childDrawer!: MatDrawer;
  books: IBook[] = [];
  currentBook: IBook;

  ngOnInit(): void {
    this.createBookList();
  }

  /**
   * Open the child drawer to add a new book
   */
  public openDrawerToAddBook(): void {
    this.currentBook = {
      id: 0,
      title: '',
      author: '',
      pages: 0
    };
    this.childDrawer.open();
  }

  /**
   * Open the child drawer to edit an existing book
   * @param book
   */
  public openDrawerToEditBook(book: IBook) {
    this.currentBook = cloneDeep(book);
    this.childDrawer.open();
  }

  /**
   * Add a book
   * @param book
   */
  public addBook(book: IBook): void {
    /*
     * Set the new book's ID to the next ID.
     * This example assumes that the books are in ascending order by ID.
     */
    book.id = this.books[this.books.length - 1].id + 1;

    this.books.push(book);
    this.childDrawer.close();
  }

  /**
   * Update a book
   * @param book
   */
  public updateBook(book: IBook): void {
    this.books[this.getIndexOfBook(book)] = book;
    this.childDrawer.close();
  }

  /**
   * Remove a book
   * @param book
   */
  public removeBook(book: IBook): void {
    this.books.splice(this.getIndexOfBook(book), 1);
    this.childDrawer.close();
  }

  /**
   * Get the index location of a book
   * @param bookToSearchFor
   * @private
   */
  private getIndexOfBook(bookToSearchFor: IBook): number {
    return this.books.findIndex(book => book.id === bookToSearchFor.id);
  }

  /**
   * Create a list of books
   * @private
   */
  public createBookList(): void {
    this.books = [
      {
        id: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        pages: 281
      },
      {
        id: 2,
        title: "1984",
        author: "George Orwell",
        pages: 328
      },
      {
        id: 3,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        pages: 279
      },
      {
        id: 4,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        pages: 180
      },
      {
        id: 5,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        pages: 234
      }
    ]
  }

}

/**
 * Generally interfaces will be housed in separate TypeScript objects,
 * but this one is listed here for the sake of a simple example.
 */
export interface IBook {
  id: number;
  title: string;
  author: string;
  pages: number;
}
