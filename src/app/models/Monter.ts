import Magic from "./Magic";

export interface Monster{
    id: Number;
    name: string;
    image: string;
    description: string;
    magic?: Array<Magic>;
}