import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSharedModule } from 'app/shared/shared.module';
import { DocumentComponent } from './document.component';
import { DocumentDetailComponent } from './document-detail.component';
import { DocumentUpdateComponent } from './document-update.component';
import { DocumentDeleteDialogComponent } from './document-delete-dialog.component';
import { documentRoute } from './document.route';
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
    imports: [AppSharedModule, RouterModule.forChild(documentRoute), FileUploadModule],
  declarations: [DocumentComponent, DocumentDetailComponent, DocumentUpdateComponent, DocumentDeleteDialogComponent],
  entryComponents: [DocumentDeleteDialogComponent]
})
export class AppDocumentModule {}
