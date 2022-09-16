import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AcromineService } from 'src/app/services/acromine.service';
import { DatabaseService } from 'src/app/services/database.service';
import { DialogoAcronimosComponent } from './dialogo-acronimos/dialogo-acronimos.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public animacion: boolean = false
  public acronimo = new FormControl('');
  public significados = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['fullForm', 'freq', 'since', 'acciones'];
  @ViewChild('paginator') paginator: any = MatPaginator;

  constructor(private acromine: AcromineService,
    public snackBar: MatSnackBar,
    private database: DatabaseService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }


  // Ejecuta la consulta a la api de acromine
  buscar(valor:string) {
    this.animacion = true;

    this.acromine.buscarAcronimo(valor).then(res => {
      this.significados.data = res.data[0].lfs;
      this.significados.paginator = this.paginator;
      this.guardarHistorial(valor); // Si la consulta es exitosa la guarda en el historial
      this.animacion = false;
    }).catch(error => {
      this.animacion = false;
      this.snackBar.open('Error en la búsqueda', undefined, {duration: 2000});
    });
  }

  // Guarda la consulta en la base de datos
  guardarHistorial(valor:string) {
    this.database.guardarAcronimo(valor).then(res => {
      this.snackBar.open('Guardado en historial', undefined, {duration: 4000});
    }).catch(error => {
      this.snackBar.open('Error al guardar en historial', undefined, {duration: 4000});
    });
  }

  // Diálogo con los detalles de los significados del acrónimo
  abrirDialogoDetalles(significados:any) {
    let dialogRef = this.dialog.open(DialogoAcronimosComponent, {
      width: '750px',
      height: 'max-content',
      autoFocus: false,
      data: {
        nombre: significados.lf,
        significados: significados.vars
      }
    });
  }

}
