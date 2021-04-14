import { MAGICS } from 'src/app/mock-data/MAGICS';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import Magic from 'src/app/models/Magic';
import { Monster } from 'src/app/models/Monter';

@Component({
  selector: 'form-monster',
  templateUrl: './form-monster.component.html',
  styleUrls: ['./form-monster.component.css']
})
export class FormMonsterComponent implements OnInit {

  @Input() formData!: Monster;
  @Output() save = new EventEmitter<Monster>();
  
  constructor() { }
  templateMagic:Array<Magic> = MAGICS;

  checkMagic(id: Number): Boolean{
    let listMagic = this.formData.magic;
    if(listMagic){
      let existedIndex = listMagic.findIndex(item => item.id == id);
      return existedIndex != -1;
    }
    return false;
  }

  updateFormObjectMagic(magic: Magic, event: any){
    let listMagic = this.formData.magic;
    if(listMagic){   
      let existedIndex = listMagic.findIndex(item => item.id == magic.id);
      if(event.target.checked && existedIndex == -1){
        if(this.formData.magic){
          this.formData.magic.push(magic);
        }else{
          this.formData.magic = [magic];
        }
      }
  
      if(event.target.checked == false && existedIndex != -1){
        if(this.formData.magic){
          this.formData.magic = this.formData.magic.filter(
                                          item => item.id != magic.id
                                        );
        }
      }
    }
  }
  updateFormObjectAttribute(attributeName: string, event: any){
    switch (attributeName){
      case 'id':
        this.formData.id = Number(event.target.value)
        break;
      case 'name':
        this.formData.name = event.target.value
        break;
      case 'image':
        this.formData.image = event.target.value
        break;
      case 'description':
          this.formData.description = event.target.value
          break;
    }
  }

  submitForm(event: any){
    event.preventDefault();
    this.save.emit(this.formData)
    this.formData = {
      id: 0,
      name: "",
      image: "",
      description: "",
      magic: []
    }
  }

  ngOnInit(): void {
  }

}
