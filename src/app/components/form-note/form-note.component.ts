import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Note } from 'src/app/dataModels/note';
import { UserService } from 'src/app/service/user-service.service';
@Component({
  selector: 'app-form-note',
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css']
})
export class FormNoteComponent {
  note: Note;

  constructor(
    private dialog: MatDialog,
    private userService: UserService
    ){this.note = new Note }

  onSubmit(){
    this.userService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.note.user = decodedData.id;
        this.userService.addNote(this.note).subscribe(() => location.reload())
      }
    });
  }

  close(): void {
     this.dialog.closeAll()
  }
}
