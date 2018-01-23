import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  constructor() { }


  public getData() {

    return [
      {
        id: 1,
        name: "Moshe"
      },
      {
        id: 1,
        name: "Shlomo"
      }
    ];

  }


}
