import { Component, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private appService: AppService) { }

  list:any[];

  ngOnInit() {
    this.list = this.appService.getData();

    // console.log("Hello World !");
    // console.log(
    //   this.appService.getData()
    // );
  }

}
