import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IClasse, Classe } from 'app/shared/model/classe.model';
import { ClasseService } from './classe.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-classe-update',
  templateUrl: './classe-update.component.html'
})
export class ClasseUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    teacher: [],
    studentArea: []
  });

  constructor(
    protected classeService: ClasseService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ classe }) => {
      this.updateForm(classe);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(classe: IClasse): void {
    this.editForm.patchValue({
      id: classe.id,
      name: classe.name,
      teacher: classe.teacher,
      studentArea: classe.studentArea
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const classe = this.createFromForm();
    if (classe.id !== undefined) {
      this.subscribeToSaveResponse(this.classeService.update(classe));
    } else {
      this.subscribeToSaveResponse(this.classeService.create(classe));
    }
  }

  private createFromForm(): IClasse {
    return {
      ...new Classe(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      teacher: this.editForm.get(['teacher'])!.value,
      studentArea: this.editForm.get(['studentArea'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClasse>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
