
import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (form: FormGroup) => {
        const control = form.controls[controlName];
        const matchingControl = form.controls[matchingControlName];

        // return null if controls haven't initialised yet
        if (!control || !matchingControl) {
            
          return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return null;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
            return null;
        } else {
            matchingControl.setErrors(null);
            return null;
        }
    }
}
