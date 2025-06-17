import { UntypedFormGroup } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if ( matchingControl.errors && !matchingControl.errors.mustMatch ) {
            return;
        }


        if (control.value != matchingControl.value) {
            matchingControl.setError({ mustMatch: true });
        } else {
            matchingControl.setError(null);
        }
    }
}