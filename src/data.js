import gold from './utils/images/gold2.png';
import silver from './utils/images/silver2.png';
import bronze from './utils/images/bronze2.png';
import science from './utils/images/science.png';
import historyImg from './utils/images/history.png';
import math from './utils/images/math.png';
import reviwer1 from './utils/images/reviewer1.jpg';
import reviwer2 from './utils/images/reviewer2.jpg';
import reviwer3 from './utils/images/reviewer3.jpg';
import reviwer4 from './utils/images/reviewer4.jpg';
import reviwer5 from './utils/images/reviewer5.jpg';


export const menu = [
    {id: 1, title: 'Dashboard', icon: 'fa fa-tachometer', isActive:false, path: '/dashboard'},
    {id: 2, title: 'Messages', icon: 'fa fa-envelope-o', isActive:false, path: '/dashboard/messages'},
    {id: 3, title: 'Favorites', icon: 'fa fa-heart-o', isActive:false, path: '/dashboard/favorites'},
    {id: 5, title: 'Account', icon: 'fa fa-user', isActive:false, path: '/dashboard/account'},
    {id: 4, title: 'Analytics', icon: 'fa fa-line-chart', isActive:false, path: '/dashboard/analytics'},
    {id: 6, title: 'Settings', icon: 'fa fa-cog', isActive:false, path: '/dashboard/setting'},
    {id: 7, title: 'Sign out', icon: 'fa fa-sign-out', isActive:false, path: '/signOut'}
]
export const navbars = [
    {id: 1, text: 'EXPLORE', isToggled: false, isScrollTag: false, page: '/dashboard'},
    {id: 3, text: 'ABOUT US', isToggled: false, isScrollTag: true}, 
    {id: 4, text: 'REVIEWS', isToggled: false, isScrollTag: true},
    {id: 2, text: 'CONTACT', isToggled: false, isScrollTag: true}
];

export const quizzes = [
    {id:1, assignee: "Kingsley", category: 'History', time: '00:05:23', status: '', action: '', cName:'' },
    {id:2, assignee: "Chijindu", category: 'Science', time: '02:05:03', status: '', action: '', cName:'' },
    {id:3, assignee: "Kelvin", category: 'Entertainment', time: '00:00:00', status: '', action: '', cName:'' },
    {id:4, assignee: "Promise",  category: 'Math',time: '00:00:00', status: '', action: '', cName:'' },
    {id:5, assignee: "King", category: 'Sports', time: '11:05:43', status: '', action: '', cName:'' },
    {id:6, assignee: "Chinedu", category: 'Math', time: '- 00:00:50', status: '', action: '', cName:'' },
    {id:7, assignee: "Promise", category: 'Science', time: '07:32:01', status: '', action: '', cName:'' },
    {id:8, assignee: "Enzo", category: 'Science', time: '07:32:01', status: '', action: '', cName:'' },
    {id:9, assignee: "Michael", category: 'Science', time: '07:32:01', status: '', action: '', cName:'' },
    {id:10, assignee: "Donny", category: 'Science', time: '07:32:01', status: '', action: '', cName:'' },
    {id:11, assignee: "Zanzy", category: 'Science', time: '07:32:01', status: '', action: '', cName:'' },
    {id:12, assignee: "Lucky", category: 'Science', time: '07:32:01', status: '', action: '', cName:'' },
    {id:13, assignee: "Emmanuel", category: 'Scince', time: '00:00:00', status: '', action: '', cName:'' }
]



export const leaderboard = [
    {id:1, user: 'Kingsley', rank: 4.5, points : 82, isRanked : false},
    {id:2, user: 'Danielson', rank: 2.5, points : 71, isRanked : false},
    {id:3, user: 'Michael', rank: 1.5, points : 51, isRanked : false},
    {id:4, user: 'Zanzy', rank: 0.25, points : 21, isRanked : false},
    {id:5, user: 'Pedro', rank: 0.3, points : 12, isRanked : false},
    {id:6, user: 'Pedro', rank: 0.3, points : 12, isRanked : false},
    {id:7, user: 'Pedro', rank: 0.3, points : 12, isRanked : false},
    {id:8, user: 'Pedro', rank: 0.3, points : 12, isRanked : false},
    {id:9, user: 'Marcus', rank: 0, points : 10, isRanked : false}
];

export const activities = [
    {id:1, date: '07 August', keyword:'Business Analysis', category:'Math', participants:27, status:'ON'},
    {id:2, date: '23 Febuary', keyword:'Aquatic Research', category:'History', participants:12, status:'ON'},
    {id:3, date: '02 December', keyword:'Celsius and Fahrenheit equal', category:'Scince', participants:9, status:'ENDED'},
    {id:4, date: '15 January', keyword:'The Ancient Greek physician', category:'Science', participants: 3, status:'SOON'},
    {id:5, date: '11 March', keyword:'Fastest hatrick', category:'Sports', participants:27, status:'SOON'},
    {id:6, date: '05 June', keyword:'Best Female Solo Artist', category:'Entertainment', participants:27, status:'ON'},
    {id:7, date: '05 June', keyword:'Best Female Solo Artist', category:'Entertainment', participants:27, status:'ON'},
    {id:8, date: '05 June', keyword:'Best Female Solo Artist', category:'Entertainment', participants:27, status:'ON'},
    {id:9, date: '05 June', keyword:'Best Female Solo Artist', category:'Entertainment', participants:27, status:'ON'},
    {id:10, date: '30 April', keyword:'Coronation Street', category:'Entertainment', participants:27, status:'ENDED'}
];

export const history = [
    {id:1, date: '07 August', keyword:'Business Analysis', score: 57},
    {id:2, date: '23 Febuary', keyword:'Aquatic Research', score: 65},
    {id:3, date: '02 December', keyword:'Celsius and Fahrenheit equal',score: 25},
    {id:4, date: '15 January', keyword:'The Ancient Greek physician', score: 95},
    {id:5, date: '15 January', keyword:'The Ancient Greek physician', score: 95},
    {id:6, date: '15 January', keyword:'The Ancient Greek physician', score: 95},
    {id:7, date: '15 January', keyword:'The Ancient Greek physician', score: 95},
    {id:8, date: '15 January', keyword:'The Ancient Greek physician', score: 95},
    {id:9, date: '11 March', keyword:'Fastest hatrick', category:'Sports', score: 72}
];

// const user = JSON.parse(localStorage.getItem("user"));
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
let userDetails=[]
if(user){
    userDetails= [
        {id: 1, fieldname: 'firstname',label: 'First-Name', icon: 'fa fa-user-o',isEditable:true, detailData: user?.firstname, isDisabled:true},
        {id: 2, fieldname: 'lastname',label: 'Last-Name', icon: 'fa fa-user-o',isEditable:true, detailData: user?.lastname, isDisabled:true},
        {id: 3, fieldname: 'phoneNumber',label: 'Phone Number', icon: 'fa fa-phone',isEditable:true, detailData: user?.phoneNumber, isDisabled:true},
        {id: 6, fieldname: 'email',label: 'Email', icon: 'fa fa-envelope-o',isEditable:true, detailData: user?.email, isDisabled:true},
        {id: 4, fieldname: 'country',label: 'Country Region', icon: 'fa fa-globe',isEditable:false, detailData: 'Enugu, Nigeria', isDisabled:true},
        {id: 5, fieldname: 'language',label: 'Language', icon: 'fa fa-language',isEditable:false, detailData: 'English(Uk)-English', isDisabled:true},
    ];
}else{
    console.log('no user');
}
export {userDetails}

export const questionCategories =[
    {id: 1, cateName:"Science"},
    {id: 2, cateName:"Math"},
    {id: 3, cateName:"History"},
    {id: 4, cateName:"Sports"},
    {id: 5, cateName:"Entertainment"},
];

export const messages =  [
    {id: 1, message: 'You won the amazon developers challenge congratulations congratulations to you'},
    {id: 2, message: 'You won the amazon developers challenge congratulations congratulations to you'},
    {id: 2, message: 'You won the amazon developers challenge congratulations congratulations to you'},
    {id: 2, message: 'You won the amazon developers challenge congratulations congratulations to you'},
    {id: 2, message: 'You won the amazon developers challenge congratulations congratulations to you'}
];

export const favorites = [
    {id: 1, fav: 'Anathomy research'},
    {id: 2, fav: 'Anathomy research'},
    {id: 3, fav: 'Anathomy research'},
    {id: 4, fav: 'Anathomy research'},
    {id: 5, fav: 'Anathomy research'},
];

export const awardwinners = [
    {id: 1, name: 'Thenny Daniels', points: 830, award: 'GOLD', quizzes: 75, medal: gold},
    {id: 2, name: 'John Kelvin', points: 795, award: 'Silver', quizzes: 40, medal: silver},
    {id: 3, name: 'Emmanuel Henry', points: 510, award: 'Bronze', quizzes: 25, medal: bronze}
];

const pubblishedQuiz = [];

export const selectedQuiz = [
    {id: 1, question: "Who's the Aptech president1 ?", options: [{id: 1, value: 'Chiagozie'}, {id: 2, value: 'Marthin'}, {id: 3, value: 'Donald'}], answer:'Marthin'},
    {id: 2, question: "Who's the Aptech president2 ?", options: [{id: 1, value: 'Chiagozie'}, {id: 2, value: 'Marthin'}, {id: 3, value: 'Donald'}], answer:'Donald'},
    {id: 3, question: "Who's the Aptech president3 ?", options: [{id: 1, value: 'Chiagozie'}, {id: 2, value: 'Marthin'}, {id: 3, value: 'Donald'}], answer:'Chiagozie'},
    {id: 4, question: "Who's the Aptech president4 ?", options: [{id: 1, value: 'Chiagozie'}, {id: 2, value: 'Marthin'}, {id: 3, value: 'Donald'}], answer:'gdg'},
    {id: 5, question: "Who's the Aptech president5 ?", options: [{id: 1, value: 'Chiagozie'}, {id: 2, value: 'Marthin'}, {id: 3, value: 'Donald'}], answer:'hhhh'},
];

export const onGoingQuiz = [
    {
        id: 1, 
        img:math, 
        keyword: "The Calculus Capers", 
        creator: "Wilmart Ben", 
        day:2, 
        hour:1, 
        minute:30, 
        second:0,
        participants: 55,
        stake: 75
    },
    {
        id: 2, 
        img:science, 
        keyword: "Cosmic Adventurer", 
        creator: "Okoro Daniels", 
        day:0, 
        hour:12, 
        minute:47, 
        second:32,
        participants: 65,
        stake: 92
    },
    {
        id: 3, 
        img:historyImg, 
        keyword: "The Modern Marvels", 
        creator: "Luis Evra", 
        day:4, 
        hour:5, 
        minute:9, 
        second:0,
        participants: 82,
        stake: 32
    }
]

export const reviews =[
    {
        id: 3, 
        name: "Precious O.", 
        img: reviwer3, 
        qoute: "I found this quiz to be very insightful and thought-provoking. It gave me a fresh perspective on a topic I thought I already knew a lot about."
    },
    
    {
        id: 2, 
        name: "FrankLyin W.", 
        img: reviwer4,
      
        qoute: "This quiz was such a blast! I enjoyed testing my knowledge and learning new things along the way. Can't wait to take more quizzes like this one!"
    },

    {
        id: 1, 
        name: "Daniel T.", 
        img: reviwer1, 
        qoute: "I've been using this quiz website for months and it's been a great way to keep my mind sharp. The questions are challenging and the interface is easy to use. Highly recommend"
    },

    {
        id: 5, 
        name: "Rachel L.", 
        img: reviwer5, 
        qoute: "I've tried many quizzes before, but this one was truly engaging and informative. I learned so much and had fun doing it!"
    },
    
    {
        id: 4, 
        name: "Dona P.", 
        img: reviwer2, 
        qoute: "I loved how interactive this quiz was! The graphics and animations really made the experience enjoyable."
    }
    
]