import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserQuizzComponent } from './user-quizz/user-quizz.component';
import { AddQuizzComponent } from './add-quizz/add-quizz.component';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { TakeQuizzComponent } from './take-quizz/take-quizz.component';
import { AllQuizzComponent } from './all-quizz/all-quizz.component';
import { DisplayResultComponent } from './display-result/display-result.component';
import { ReviewComponent } from './review/review.component';
import { QuizzService } from '../services/quizz.service';
import { TakeQuizzPageComponent } from './take-quizz-page/take-quizz-page.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RatingModule } from 'primeng/rating';
import { SplitButtonModule } from 'primeng/splitbutton';

@NgModule({
  declarations: [
    UserQuizzComponent,
    AddQuizzComponent,
    TakeQuizzComponent,
    AllQuizzComponent,
    DisplayResultComponent,
    ReviewComponent,
    TakeQuizzPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
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
    InputTextareaModule,
    RatingModule,
    SplitButtonModule,
  ],
  exports: [
    AddQuizzComponent,
    UserQuizzComponent,
    TakeQuizzComponent,
    AllQuizzComponent,
    TakeQuizzPageComponent,
    ReviewComponent,
  ],
  providers: [MessageService, ConfirmationService, QuizzService],
})
export class QuizzModule {}
