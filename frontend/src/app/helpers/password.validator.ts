import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let password_confirmation = AC.get('password_confirmation').value; // to get value in input tag
        if(password != password_confirmation) {
            console.log('false');
            AC.get('password_confirmation').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }
    }
}