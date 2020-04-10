import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IRestaurant, IDish, IReview } from './restaurant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let restaurants = [
      { id: 1, name: 'Darejani', image_url: 'https://media-cdn.tripadvisor.com/media/photo-p/15/e0/a6/6f/caption.jpg', address:'Kazybek bi St 40', contact:'80004365', avg_cost:3000},
      { id: 2, name: 'Gosti', image_url: 'https://restolife.kz/upload/information_system_6/3/1/3/item_313/information_items_property_3513.jpg', address:'Kunaeva 78', contact:'345009445', avg_cost:6000 },
      { id: 3, name: 'Navat', image_url: 'https://restolife.kz/upload/information_system_6/1/6/1/item_16182/information_items_property_18092.jpg', address:'Dostyk ave 48', contact:'2300906', avg_cost:5000},
      { id: 4, name: 'Ocean Basket', image_url: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/94/20/9c/caption.jpg', address:'Kazybek bi St 50', contact:'220003232', avg_cost:6500},
      { id: 5, name: 'Manga Sushi', image_url: 'https://media-cdn.tripadvisor.com/media/photo-s/10/08/aa/5d/getlstd-property-photo.jpg', address:'Gogolya 201', contact:'123455454', avg_cost:3000 },
      { id: 6, name: 'Korean House', image_url: 'https://korean-house.kz/wp-content/uploads/2017/03/1741-min-e1511928119838.jpg', address:'Abylai khan ave 92', contact:'555444454', avg_cost:2000},
      
    ];
    let dishes = [
      {id: 1, name: 'Salmon pasta', price:3200, restaurantId: 1, image_url:'https://vikalinka.com/wp-content/uploads/2019/07/Salmon-Pasta-1-Edit.jpg'},
      {id: 2, name: 'Spicy Seafood', price: 4800, restaurantId:3, image_url:'https://www.koreanbapsang.com/wp-content/uploads/2017/10/DSC_1874-1-e1507600586162.jpg'},
      {id: 3, name: 'Fish pasta', price: 3700, restaurantId:2, image_url:'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/12/27/0/FNK_spicy-fish-and-olive-spaghetti_s4x3.jpg.rend.hgtvcom.826.620.suffix/1389218637695.jpeg'},
      {id: 4, name: 'Spicy Pasta', price:1600, restaurantId:4, image_url:'https://minimalistbaker.com/wp-content/uploads/2016/01/AMAZING-Spicy-Red-Pasta-with-Lentils-and-GF-Pasta-vegan-plantbased-glutenfree-recipe-healthy-dinner.jpg'},
      {id: 1, name: 'Hamburger', price:3200, restaurantId: 5, image_url:'https://barbecuebible.com/wp-content/uploads/2013/05/featured-great-american-hamburger.jpg'},
      {id: 2, name: 'Honey Chicken', price: 4600, restaurantId:6, image_url:'https://rasamalaysia.com/wp-content/uploads/2014/08/honey-sesame-chicken-thumb.jpg'},
      {id: 3, name: 'Dumplings', price: 1400, restaurantId:3, image_url:'https://www.sbs.com.au/food/sites/sbs.com.au.food/files/styles/full/public/ep9-korea-recipe-korean-dumplings-cu.jpg?itok=rN8TfdCu'},
      {id: 4, name: 'Bibimpap', price:2000, restaurantId:6, image_url:'https://www.budgetbytes.com/wp-content/uploads/2017/01/Bibimbap-above-500x500.jpg'},
      {id: 1, name: 'Karri rice', price:1200, restaurantId: 5, image_url:'https://images.squarespace-cdn.com/content/v1/5505dfb0e4b052040efb8dc2/1426616851907-4RKNKS4B7GMCPTJ6FRQM/ke17ZwdGBToddI8pDm48kF9aEDQaTpZHfWEO2zppK7Z7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UX7HUUwySjcPdRBGehEKrDf5zebfiuf9u6oCHzr2lsfYZD7bBzAwq_2wCJyqgJebgg/IMG_3450.JPG?format=750w'},
      {id: 2, name: 'Udon', price: 2800, restaurantId:2, image_url:'https://www.justonecookbook.com/wp-content/uploads/2015/11/Niku-Udon-500x400.jpg'},
      {id: 3, name: 'Tomato soup', price: 700, restaurantId:5, image_url:'https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18173927/051091055_01-main.jpg'},
      {id: 4, name: 'Strawberry dessert', price:2000, restaurantId:2, image_url:'https://images-gmi-pmc.edge-generalmills.com/e49d0d89-4e45-42bc-93e2-2defb30c079d.jpg'}

    ];
    let users = [
      {id: 1, username: 'user1', password:'user1', first_name: 'user1_f', email:'user1@gmail.com', is_admin:false},
      {id: 2, username: 'user2', password:'user2', first_name: 'user2_f', email:'user2@gmail.com', is_admin:true},
]
    let reviews = [
      {id: 1, text: 'Very good place to sit with family', username: 'Dina', restaurantId: 2},
      {id: 2, text:'Quite good, but prices are little bit expensive', username: 'Zhansaya', restaurantId: 1},
      {id: 3, text: 'Came for lunch with my sister. We loved our Thai-style mains which were amazing with lots of flavour, very impressive for a vegetarian restaurant. But the service was below average and the chips were too terrible to finish.', username: 'user0', restaurantId:3},
      {id:4, text: 'Had dinner with girl friends. Menu is perfect, something for everyone. Service was awesome and Jason was very accommodating. Will be back definitely!', username:'Serik', restaurantId:4},
      {id:5, text:'Visited as a guest in the Echo restaurant for lunch just today. We were entertaining friends from California, and enjoyed our ocean side table. We chose to stay indoors - to enjoy the air conditioning 😊. I just want to say that, in addition to a nice meal, we had a delightful waitress, Jackie. She had just the right balance of friendliness and efficiency. She recognized that we wanted time to visit and did not rush us. She and other staff members made certain that we had everything we needed. Kudos!', username:'Zhanna', restaurantId:5},
      {id:6, text: 'We had lunch here a few times while on the island visiting family and friends. The servers here are just wonderful and have great memories it seems. We sat on the ocean front patio and enjoyed the view with our delicious wine and lunch. Must try!', username:'Dastan', restaurantId:6},
      {id:7, text: 'Hello. Please give our thanks to the Manager(s) and others for the wonderful room and bottle of sparkling wine for our Anniversary stay. We had an amazing time. The room was so comfortable, the food at Echo absolutely spectacular (we ate two meals there). Our waitress was just wonderful. Looking forward to staying with you in the future. What a great place!', username:'CoolBoy', restaurantId:4},
      {id:8, text: 'Spent 3 nights at this resort earlier this month and it was a great stay! We paid for an upgrade to the oceanfront cabana, which was worth the price. The beach views, calm ocean and ability to watch the sunset on our patio were highlights of the trip! The hotel restaurant was exceptional, not only because every meal we enjoyed had a variety of options and was flavorful but also because the prices were so reasonable for an oceanfront resort! The entire island and resort were a lot more laid back and calm than other touristy coastal front towns in the southeast, but that may in part due to it being early March. I would imagine there is a bit more traffic during high seasons, but either way, we will definitely be back! Highly recommended!', username:'Maya', restaurantId:3}
    ];

    let orders = [
      {id: 1, dish_name: 'Salmon pasta', count: 1, user: users[0], dish_url: 'https://vikalinka.com/wp-content/uploads/2019/07/Salmon-Pasta-1-Edit.jpg'},
      {id: 2, dish_name: 'Tomato soup', count:2, user: users[1], dish_url:'https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads/2017/04/18173927/051091055_01-main.jpg'},
      {id:3, dish_name:'Bibimpap', count:1, user: users[1], dish_url:'https://www.budgetbytes.com/wp-content/uploads/2017/01/Bibimbap-above-500x500.jpg'}
    ];
    return {restaurants, dishes, users, reviews, orders};
  }

 
  genId<T extends IRestaurant | IReview>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
}
