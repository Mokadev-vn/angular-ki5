import {Hero} from '../models/Hero';
export const HEROES: Array<Hero> = [
    { 
        id: 11, 
        name: 'Vũ Văn Chương', 
        img: "https://iap.poly.edu.vn/user/ph/PH11175.jpg",
        skills: [
            {
                id: 1,
                name: "java"
            },
            {
                id: 2,
                name: "C-sharp"
            }
        ]
    },
    { 
        id: 12, 
        name: 'Phạm Tiến Doanh', 
        img: "https://iap.poly.edu.vn/user/ph/PH10742.jpg",
        skills: [
            {
                id: 3,
                name: "Php"
            },
            {
                id: 4,
                name: "Android"
            }
        ] 
    },
    { 
        id: 13, 
        name: 'Trần Việt Dũng', 
        img: "https://iap.poly.edu.vn/user/ph/PH10871.jpg",
        skills: []
    }
];
