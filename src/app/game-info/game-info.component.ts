import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {

  cardAction = [
    {title: 'Waterfall', description: 'Everyone should keep drinking until the person who picked the card stops. So who knows how long you will be going for!'},
    {title: 'You', description: 'Pick someone to drink.'},
    {title: 'Me', description: 'Whoever gets this card drinks.'},
    {title: 'Whores', description: 'All girls drink.'},
    {title: 'Thumb master', description: 'The person with the card may place their thumb on the table at any time during the game and the last person to do so has to drink'},
    {title: 'Dicks', description: 'All guys drink'},
    {title: 'Heaven', description: 'The person with the card may raise their hand at any time during the game and the last person to do so has to drink'},
    {title: 'Mate', description: 'Pick a mate who has to drink with you'},
    {title: 'Rhyme', description: 'Say a word and go round the circle rhyming with that word, whoever hesitates or can\'t think of a rhyming word has to drink, words with no rhyme such as orange are banned'},
    {title: 'Categories', description: 'say a word from that category and go round the circle, whoever hesitates or can\'t think of a word associated with that category has to drink'},
    {title: 'Jack - Rule', description: 'Make a new rule for the game'},
    {title: 'Queen - Question master', description: 'If you ask a player a question and they answer they have to drink, if they answer the question with "Fuck you question master" then you have to drink'},
    {title: 'King ', description: 'Add to the dirty pint.'},
  ];

  title: string = '';
  description: string = '';

  @Input() card!: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.card) {
      let cardNumber: any = this.card?.split('_')[1];
      this.title = this.cardAction[cardNumber  - 1].title;
      this.description = this.cardAction[cardNumber  - 1].description; 
    }
  }
}
