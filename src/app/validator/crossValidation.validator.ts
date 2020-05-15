import { AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export const CrossValidation: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const priceMin = control.get('priceMin');
    const priceMax = control.get('priceMax');
    const dateMin = control.get('dateMin');
    const dateMax = control.get('dateMax');

    let result = null;

    if (priceMin && priceMax && priceMin.value > priceMax.value) {
        result = { forbidenValuePrice: true };
    }

    if (dateMin && dateMax && dateMin.value > dateMax.value) {
        result = { forbidenValueDate: true };
    }

    return result;
};
