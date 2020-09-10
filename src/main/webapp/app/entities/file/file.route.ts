import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFile, File } from 'app/shared/model/file.model';
import { FileService } from './file.service';
import { FileComponent } from './file.component';
import { FileDetailComponent } from './file-detail.component';

@Injectable({ providedIn: 'root' })
export class FileResolve implements Resolve<IFile> {
  constructor(private service: FileService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFile> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((file: HttpResponse<File>) => {
          if (file.body) {
            return of(file.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new File());
  }
}

export const fileRoute: Routes = [
  {
    path: '',
    component: FileComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'appApp.file.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FileDetailComponent,
    resolve: {
      file: FileResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'appApp.file.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
