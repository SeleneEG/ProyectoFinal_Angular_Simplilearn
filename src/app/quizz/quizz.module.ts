import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserQuizzComponent } from './user-quizz/user-quizz.component';
import { EditQuizzComponent } from './edit-quizz/edit-quizz.component';
import { AddQuizzComponent } from './add-quizz/add-quizz.component';
import { DeleteQuizzComponent } from './delete-quizz/delete-quizz.component';
import { PanelModule } from 'primeng/panel';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    UserQuizzComponent,
    EditQuizzComponent,
    AddQuizzComponent,
    DeleteQuizzComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    RadioButtonModule,
    InputNumberModule,
    DividerModule,
    CardModule,
    CheckboxModule,
    FileUploadModule,
  ],
  exports: [
    AddQuizzComponent,
    DeleteQuizzComponent,
    EditQuizzComponent,
    UserQuizzComponent,
  ],
  providers: [MessageService, ConfirmationService],
})
export class QuizzModule {}
