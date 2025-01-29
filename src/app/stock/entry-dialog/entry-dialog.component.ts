import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-entry-dialog',
  standalone: true,
  templateUrl: './entry-dialog.component.html',
  styleUrls: ['./entry-dialog.component.scss'],
  imports: [ 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class EntryDialogComponent {
  form: FormGroup;
  isEntry: boolean;

  constructor(
    public dialogRef: MatDialogRef<EntryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: 'entry' | 'removal' },
    private fb: FormBuilder,
    private stockService: StockService
  ) {
    this.isEntry = data.type === 'entry';
    
    this.form = this.fb.group({
      elementKey: ['', Validators.required],
      quantity: this.fb.group({
        magnitude: [0, [Validators.required, Validators.min(0.01)]],
        unit: ['ac', Validators.required]
      }),
      occurrenceDate: [new Date().toISOString().split('T')[0], Validators.required],
      locationKey: ['', Validators.required],
      observations: [''],
      sourceLocationKey: [''],
      destinationLocationKey: ['']
    });

    if (!this.isEntry) {
      this.form.removeControl('destinationLocationKey');
    } else {
      this.form.removeControl('sourceLocationKey');
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const payload = {
      ...this.form.value,
      [this.isEntry ? 'destinationLocationKey' : 'sourceLocationKey']: this.form.value.locationKey
    };

    delete payload.locationKey;

    if (this.isEntry) {
      this.stockService.createManualEntry(payload).subscribe(() => this.dialogRef.close(true));
    } else {
      this.stockService.createManualRemoval(payload).subscribe(() => this.dialogRef.close(true));
    }
  }
}