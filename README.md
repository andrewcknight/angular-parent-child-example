# angular-parent-child-example

## Setup
### Angular
This example requires the addition of the Angular FormsModule
in order for the mat-form-fields to work.

The supporting modules have been added to the app.module.ts file:
* FormsModule

### Material
This example uses the Material style.

`ng add @angular/material`

The supporting modules have been added to the app.module.ts file:
* MatToolbarModule
* MatButtonModule
* MatListModule
* MatSidenavModule
* MatIconModule
* MatFormFieldModule
* MatInputModule

### LoDash cloneDeep
This example uses the LoDash cloneDeep library.

See details below: Parent Component > Opening the Drawer

`npm i lodash`

---

## Parent Component
### Defining the Book
The parent component uses the IBook interface to define a book.
Usually, the interface is defined in a separate TypeScript file,
but for this example, it has been defined within 
the parent.component.ts file.

### Opening the Drawer
When adding a book, the openDrawerToAddBook method is called,
which will create an empty currentBook and open the side drawer.

When editing a book, the openDrawerToEditBook method is called,
which will set the currentBook equal to the one that was selected
and open the side drawer.

You will notice that the openDrawerToEditBook method calls the LoDash cloneDeep() method.
This library is used because we want to edit a clone of the selected object.
If we did not clone the object first, the associated item in the list
would be updated automatically when filling out the edit form, which would
not make sense if the user ends up closing/cancelling their edit. We only want
the associated item in the list to be updated when the "Update" button is clicked.

### Referencing the Child Component
The child component is referenced in the parent.component.html 
file's mat-drawer using its selector "app-child."
We reference the child component's Input (using brackets) and 
Output (using parenthesis) events within the selector tag.

```
  <app-child  [book]="currentBook"
              (closeDrawer)="childDrawer.close()"
              (addBook)="addBook($event)"
              (updateBook)="updateBook($event)"
              (removeBook)="removeBook($event)">
  </app-child>
```

Input:
* book -> set by the parent.component.ts file's currentBook value

Output events:
* closeDrawer -> calls the childDrawer's close method
* addBook -> calls the parent.component.ts file's addBook method
* updateBook -> calls the parent.component.ts file's updateBook method
* removeBook -> calls the parent.component.ts file's removeBook method

---

## Child Component
The Input and Outputs are defined at the top of the child.component.ts file.
```
  @Input('book') book: IBook;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Output() addBook = new EventEmitter<IBook>();
  @Output() updateBook = new EventEmitter<IBook>();
  @Output() removeBook = new EventEmitter<IBook>();
```

The HTML file emits the events when the appropriate buttons are clicked.
```
<div id="action-buttons">
  <button mat-raised-button color="accent" (click)="addBook.emit(book)" *ngIf="book.id == 0">
    Add
  </button>
  <button mat-raised-button color="accent" (click)="updateBook.emit(book)" *ngIf="book.id > 0">
    Update
  </button>
  <button mat-raised-button color="accent" (click)="removeBook.emit(book)" *ngIf="book.id > 0">
    Remove
  </button>
</div>
```
