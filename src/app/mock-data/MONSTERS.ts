import { Monster } from "../models/Monter";

export const MONSTERS: Array<Monster> = [
    {
        id: 1, 
        name: 'Monster Best', 
        image: "https://upload.wikimedia.org/wikipedia/vi/d/da/B%C3%ACa_b%E1%BB%99_manga_Monster.jpg",
        description: "Monster",
        magic: [
            {
                id: 1,
                name: "FLy",
                icon: "👿"
            },
            {
                id: 2,
                name: "Love",
                icon: "❣️"
            }
        ]
    },
    {
        id: 2, 
        name: 'Hunter Monster', 
        image: "https://cinematone.info/public/poster_001/201015105017_Monster-Hunter_yePKP.jpg",
        description: "Hello",
        magic: [
            {
                id: 1,
                name: "FLy",
                icon: "👿"
            },
        ]
    },
];
