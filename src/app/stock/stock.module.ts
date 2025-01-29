import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';

// Componentes
import { StockListComponent } from './stock-list/stock-list.component';
import { EntryDialogComponent } from './entry-dialog/entry-dialog.component';
import { UnitFormatPipe } from '../shared/pipes/unit-format.pipe';

@NgModule({
  declarations: [
    StockListComponent,   
    EntryDialogComponent,
    UnitFormatPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Angular Material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [DatePipe]
})
export class StockModule { }