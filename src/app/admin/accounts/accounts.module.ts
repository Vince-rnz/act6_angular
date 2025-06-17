import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Commonmodule } from '@angular/common';

import { AccountRoutingModule, NgModule } from './accounts-routing.module';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

@NgModule({
    imports: [
        Commonmodule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    declarations: [
        ListComponent,
        AddEditComponent
    ]
})
export class AccountsModule { }