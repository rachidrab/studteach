import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {Observable, Subscription} from 'rxjs';

import { IDocument, Document } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IClasse } from 'app/shared/model/classe.model';
import { ClasseService } from 'app/entities/classe/classe.service';
import {FileUploader} from "ng2-file-upload";
import {AccountService} from "app/core/auth/account.service";
import {Account} from "app/core/user/account.model";

type SelectableEntity = IUser | IClasse;

@Component({
  selector: 'jhi-document-update',
  templateUrl: './document-update.component.html'
})
export class DocumentUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  classes: IClasse[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    type: [null, [Validators.required]],
    teacher: [],
    classe: []
  });


  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  uploader: FileUploader | undefined;
  isDropOver = false;

  account: Account | null = null;
  authSubscription?: Subscription;
  showFile = false;


  constructor(
    private accountService: AccountService,
    private http: HttpClient,
    protected documentService: DocumentService,
    protected userService: UserService,
    protected classeService: ClasseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));

    const headers = [{name: 'Accept', value: 'application/json'}];
    this.uploader = new FileUploader({url: 'api/files', autoUpload: true, headers: headers});

    this.uploader.onCompleteAll = () => alert('File uploaded');

    this.activatedRoute.data.subscribe(({ document }) => {
      this.updateForm(document);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.classeService.query().subscribe((res: HttpResponse<IClasse[]>) => (this.classes = res.body || []));
    });
  }

  fileOverAnother(e: any): void {
    this.isDropOver = e;
  }

  fileClicked(): void {
    // @ts-ignore
    this.fileInput.nativeElement.click();
  }


  showFiles(): Observable<any> {
    return this.http.get('/getallfiles');
  }


  updateForm(document: IDocument): void {
    this.editForm.patchValue({
      id: document.id,
      name: document.name,
      type: document.type,
      teacher: document.teacher,
      classe: document.classe
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const document = this.createFromForm();
    if (this.account){
      document.teacher = this.account;
    }
    if (document.id !== undefined) {
      this.subscribeToSaveResponse(this.documentService.update(document));
    } else {
      this.subscribeToSaveResponse(this.documentService.create(document));
    }
  }

  private createFromForm(): IDocument {
    return {
      ...new Document(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      type: this.editForm.get(['type'])!.value,
      teacher: this.editForm.get(['teacher'])!.value,
      classe: this.editForm.get(['classe'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocument>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
