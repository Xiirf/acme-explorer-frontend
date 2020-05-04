import { AbstractControl } from '@angular/forms';

export function ValidateUrlOptional(control: AbstractControl) {
    if (control.value != null && control.value !== '') {
        if (!control.value.startsWith('http')) {
            return { validUrl: false };
        }
    } else if (control.value === 'undefined') {
        return { validUrl: true };
    }
    return null;
}
