import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouter } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: UntypedFormGroup;
    id: string;
    isAddMode:  boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRouter,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lasatName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            role: ['', Validators.required],
            password: ['', [Validators.minlength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
            confirmPassword: ['']
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });

        if (!this.isAddMode) {
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    } 

    get f() {return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        this.alertService.clear();

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createAccount();
        } else {
            this.updateAccount();
        }
    }

    private createAccount() {
        this.accountService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Account created successfully', { keepAfterRouteChange: true });
                    this.route.navigate(['../'], {relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateAccount() {
        this.accountService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            })
    }
}