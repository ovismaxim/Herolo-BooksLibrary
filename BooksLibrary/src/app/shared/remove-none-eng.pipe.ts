import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeNoneEng'
})
export class RemoveNoneEngPipe implements PipeTransform {


  // PIPE THAT REMOVE ALL SPAICL CHARCTHERS AND NONE ENGLISH LATTERS. 
  // IN CASE OF EMPTY STRING ON RETURN -> RETURN THE STRING 'None English Title'

  transform(value: any, args?: any): any {
    
    if(value === undefined) return 'None English Title';

    let transformedValue = value.replace(/[^a-zA-Z ]/g, ""); // LOOKS FOR ALL NONE a-z && A-Z LATTERS AND REPLACE THEM WITH ' '
    return transformedValue.search(/[A-Z]/g) === -1 ? 'None English Title' : transformedValue; // THY TO FIND A LATTER , IF DIDNT FIND RETURN A SPACIAL NAME.  < DIDNT USE LENGTH == 0 BEASCUSE transformedValue CAN CONTAIN SPACES >  
  }

}
