import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSharedModule } from 'app/shared/shared.module';
import { FileComponent } from './file.component';
import { FileDetailComponent } from './file-detail.component';
import { fileRoute } from './file.route';

@NgModule({
  imports: [AppSharedModule, RouterModule.forChild(fileRoute)],
  declarations: [FileComponent, FileDetailComponent]
})
export class AppFileModule {}
