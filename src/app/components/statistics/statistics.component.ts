import {Component, Input, OnInit} from '@angular/core';

export interface Category {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  @Input() categories: Category[];

  constructor() { }

  ngOnInit() {
  }

}
