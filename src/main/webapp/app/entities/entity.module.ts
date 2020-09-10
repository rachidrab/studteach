import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'classe',
        loadChildren: () => import('./classe/classe.module').then(m => m.AppClasseModule)
      },
      {
        path: 'document',
        loadChildren: () => import('./document/document.module').then(m => m.AppDocumentModule)
      },
      {
        path: 'file',
        loadChildren: () => import('./file/file.module').then(m => m.AppFileModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class AppEntityModule {}
