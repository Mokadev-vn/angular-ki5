import { Component, OnInit } from '@angular/core';
import {HEROES} from '../../mock-data/HEROES';
import {SKILLS} from '../../mock-data/SKILLS';
import {Hero} from '../../models/Hero';
import {Skill} from '../../models/Skill';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  heroes:Array<Hero> = HEROES;
  templateSkills:Array<Skill> = SKILLS;
  selectedSkills: Array<Skill> = [];
  formObject: Hero = {
    id: 0,
    name: "",
    img: "",
    skills: []
  }

  ngOnInit(): void {
    
  }

  addSkill(checkedSkill: Skill){
    let index = this.selectedSkills.indexOf(checkedSkill);
    if(index == -1){
      this.selectedSkills.push(checkedSkill);
    }else{
      this.selectedSkills = this.selectedSkills.filter(item => item != checkedSkill)
    }
  }

  checkSkill(skillId: Number): Boolean{
    let lstSkill = this.formObject.skills;
    let existedIndex = lstSkill.findIndex(item => item.id == skillId);
    return existedIndex != -1;
  }

  removeHero(hero:Hero){
    this.heroes = this.heroes.filter((x: Hero) => x != hero);
  }

  submitForm(event: any){
    event.preventDefault();
    let index = this.heroes.findIndex(item => item.id == this.formObject.id);
    if(index == -1){
      this.heroes.push({...this.formObject});
    }else{
      this.heroes[index] = {...this.formObject};
    }
    this.formObject = {
      id: 0,
      name: "",
      img: "",
      skills: []
    }
  }

  updateHero(hero: Hero){
    let updateHero = {...hero};
    this.formObject = updateHero;
  }

  updateFormObjectSkill(skill: Skill, event: any){
    let lstSkill = this.formObject.skills;
    let existedIndex = lstSkill.findIndex(item => item.id == skill.id);
    if(event.target.checked && existedIndex == -1){
      this.formObject.skills.push(skill);
    }

    if(event.target.checked == false && existedIndex != -1){
      this.formObject.skills = this.formObject.skills.filter(
                                      item => item.id != skill.id
                                    );
    }
  }
  updateFormObjectAttribute(attributeName: string, event: any){
    switch (attributeName){
      case 'id':
        this.formObject.id = Number(event.target.value)
        break;
      case 'name':
        this.formObject.name = event.target.value
        break;
      case 'img':
        this.formObject.img = event.target.value
        break;
    }
  }
}
