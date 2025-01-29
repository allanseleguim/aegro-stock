import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StockService } from '../../services/stock.service';
import { EntryDialogComponent } from '../entry-dialog/entry-dialog.component';
import { StockLog } from '../../models/stock-log';
import { DatePipe, CommonModule, SlicePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { UnitFormatPipe } from '../../shared/pipes/unit-format.pipe';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    FormsModule,
    UnitFormatPipe,
    DatePipe
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class StockListComponent implements OnInit {
  stockLogs: StockLog[] = [];
  displayedColumns: string[] = [
    'element', 
    'quantity', 
    'date', 
    'source', 
    'destination', 
    'actions'
  ];
  
   // Filtros com valores padrão
   startDate: Date | null = new Date(new Date().setDate(new Date().getDate() - 365)); 
   endDate: Date | null = new Date(); // Hoje
   elementFilter: string = 'string'; // Defina um valor padrão válido

  constructor(
    private stockService: StockService,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadStockLogs();
    //element::0123456789
  }

  loadStockLogs(): void {
    const filter = {
      startDate: this.datePipe.transform(this.startDate, 'yyyy-MM-dd') || '',
      endDate: this.datePipe.transform(this.endDate, 'yyyy-MM-dd') || '',
      elementKey: this.elementFilter || 'string', 
      maximumItemsPerPageCount: 20
    };

    console.log('Aplicando filtros:', filter);
    
    this.stockService.getStockLogs(filter).subscribe({
      next: (response) => {
        this.stockLogs = response.items;
        console.log('Dados carregados:', this.stockLogs);
      },
      error: (err) => console.error('Erro ao buscar dados:', err)
    });
  }

  openEntryDialog(): void {
    const dialogRef = this.dialog.open(EntryDialogComponent, {
      width: '500px',
      data: { type: 'entry' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nova entrada registrada, atualizando dados...');
        this.loadStockLogs();
      }
    });
  }

  openRemovalDialog(): void {
    const dialogRef = this.dialog.open(EntryDialogComponent, {
      width: '500px',
      data: { type: 'removal' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nova saída registrada, atualizando dados...');
        this.loadStockLogs();
      }
    });
  }

  clearFilters(): void {
    this.startDate = null;
    this.endDate = null;
    this.elementFilter = '';
    this.loadStockLogs();
  }

  onFilterChange(): void {
    this.loadStockLogs();
  }

  editLog(log: StockLog): void {
    // Implementação do método de edição
    console.log('Edit log:', log);
  }

  deleteLog(log: StockLog): void {
    // Implementação do método de exclusão
    console.log('Delete log:', log);
  }
}