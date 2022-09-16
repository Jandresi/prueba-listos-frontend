import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  public animacion = false;
  public historial = new MatTableDataSource<any>();
  public displayedColumns: string[] = ['id', 'acronimo', 'fecha'];
  @ViewChild('paginator') paginator: any = MatPaginator;

  constructor(private database: DatabaseService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.verHistorial();
  }

  // Trae todas las consultas guardadas en la base de datos
  verHistorial() {
    this.animacion=true;

    this.database.verHistorial().then(res => {
      this.historial.data = res.data;
      this.historial.paginator = this.paginator;
      this.animacion = false;
    }).catch(error => {
      this.animacion = false;
      this.snackBar.open('Ha ocurrido un error, intente de nuevo', undefined, {duration: 2000});
    });
  }

  // Muestra correctamente las fechas sin importar la región horaria
  getFechaFormateada(date:string) {
    let fecha = new Date(date).toISOString();    
    return fecha.substring(0, fecha.length - 1);
 }


}
