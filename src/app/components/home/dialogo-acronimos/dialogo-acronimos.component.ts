import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialogo-acronimos',
  templateUrl: './dialogo-acronimos.component.html',
  styleUrls: ['./dialogo-acronimos.component.scss']
})
export class DialogoAcronimosComponent implements OnInit {

  public significados = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['fullForm', 'freq', 'since'];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<DialogoAcronimosComponent>
  ) { }

  ngOnInit(): void {
    this.llenarTabla();
  }

  llenarTabla() {
    this.significados.data = this.data.significados;
  }

  cerrar() {
    this.dialogRef.close();
  }

}
