import { Component, OnInit, ViewChild } from '@angular/core';
import { Actor } from 'src/app/models/actor.model';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ActorService } from 'src/app/services/actor.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-datatable',
  templateUrl: './user-datatable.component.html',
  styleUrls: ['./user-datatable.component.css']
})
export class UserDatatableComponent implements OnInit {

  actors: Actor[];
  displayedColumns: string[] = ['name', 'surname', 'email', 'role', 'banned'];
  dataSource;
  roleList: string[] = ['Administrator', 'Manager', 'Explorer', 'Sponsor', 'Auditor'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private actorService: ActorService,
              private translateService: TranslateService,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
    this.initialize();
  }

  initialize() {
    return this.actorService.getActors()
    .then((data) => {
      const idCurrentUser = this.authService.getCurrentActor()._id;
      this.actors = data.filter(actor => actor._id !== idCurrentUser);

      this.dataSource = new MatTableDataSource<Actor>(this.actors);
      this.dataSource.paginator = this.paginator;
    })
    .catch((error) => {console.log(error); });
  }

  ngOnInit(): void {
  }

  changeUserRole(role: string, idUser: string) {
    this.actorService.updateActorRole(idUser, role)
    .then(actor => {
      this.actors.find(user => user._id === idUser).role = actor.role;
      this.toastr.success(this.translateService.instant('message.role.changed') + ' ' + actor.email);
    })
    .catch(err => {
      console.log(err);
    });
  }

  changeStateActor(idActor: string, isBanned: boolean) {
    this.actorService.updateActorState(idActor, !isBanned)
    .then(actor => {
      this.actors.find(user => user._id === idActor).banned = actor.banned;
      if (actor.banned) {
        this.toastr.success(actor.email + ' ' + this.translateService.instant('message.user.banned'));
      } else {
        this.toastr.success(actor.email + ' ' + this.translateService.instant('message.user.un.banned'));
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

}
