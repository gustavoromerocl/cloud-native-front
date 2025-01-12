import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-vital-signs-dialog',
  templateUrl: './vital-signs-dialog.component.html',
  styleUrls: ['./vital-signs-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatDialogModule, MatButtonModule, MatIconModule],
})
export class VitalSignsDialogComponent implements OnInit {
  displayedColumns = ['type', 'value', 'unit', 'measurementDate'];
  dataSource = new MatTableDataSource<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any[]) {
    this.dataSource.data = this.data;
  }

  ngOnInit() {
    this.dataSource.data = this.data;
  }
}
