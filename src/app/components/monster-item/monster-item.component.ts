import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Monster } from 'src/app/models/Monter';

@Component({
  selector: 'monster-item',
  templateUrl: './monster-item.component.html',
  styleUrls: ['./monster-item.component.css']
})
export class MonsterItemComponent implements OnInit {

  @Input() monster!: Monster;
  @Output() update = new EventEmitter<Monster>();
  @Output() remove = new EventEmitter<Monster>();

  updateMonster(){
    this.update.emit(this.monster)
  }

  removeMonster(){
    this.remove.emit(this.monster)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
