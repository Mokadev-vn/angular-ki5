import {Skill} from "./Skill";
export interface Hero{
    id: Number;
    name: string;
    img: string;
    skills: Array<Skill>;
}