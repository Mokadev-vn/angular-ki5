import { Component, OnInit } from '@angular/core';
import {MONSTERS} from '../../mock-data/MONSTERS';
import {Monster} from '../../models/Monter';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Magic from '../../models/Magic';
import { MAGICS } from 'src/app/mock-data/MAGICS';


@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})
export class MonsterComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  monsters:Array<Monster> = MONSTERS;
  templateMagic:Array<Magic> = MAGICS;
  selectedMagic: Array<Magic> = [];
  formObject: Monster = {
    id: 0,
    name: "",
    image: "",
    description: "",
    magic: []
  }

  ngOnInit(): void {
    
  }

  removeMonster(monster:Monster){
    this.monsters = this.monsters.filter((x: Monster) => x != monster);
  }

  saveData(data: Monster){
    let index = this.monsters.findIndex(item => item.id == data.id);
    if(index == -1){
      this.monsters.push({...data});
    }else{
      this.monsters[index] = {...data};
    }
  }

  updateMonster(monster: Monster){
    this.formObject = {...monster};
  }
}
