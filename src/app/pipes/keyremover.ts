import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keyremover'})
export class KeyRemover implements PipeTransform {
    transform( value: any) {
        // take an alarm object remove the key propertie and return it
        const obj = value;
        delete obj.key;
        return obj;

    }

}