import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormNoteComponent } from 'src/app/components/form-note/form-note.component';
import { Note } from 'src/app/dataModels/note';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  notes: any;

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) {}


  getNotes() {
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.userService.getNote(decodedData.id).subscribe(resut => {
          this.notes = resut;
        })
      }
    });
  }

  openPopup(): void {
    this.dialog.open(FormNoteComponent);
  }

  ngOnInit(): void {
    this.getNotes();
  }
}
