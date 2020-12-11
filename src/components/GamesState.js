import LiczeniePrzedmiotow from '../games/11LiczeniePrzedmiotow';

class GamesState {

  constructor() {
    if (localStorage.getItem('games') === null) {
      this.state = this.defaultState;
    } else {
      this.state = JSON.parse(localStorage.getItem('games'));
    }
    this.saveToLocalStorage();
  }

  get defaultState() {
    return {
      1: [
        {
          name: 'Liczenie przedmiotów',
          correct: 0,
          incorrect: 0
        },
        {
          name: 'Porównywanie liczb',
          correct: 0,
          incorrect: 0
        },
        {
          name: 'Dodawanie i odejmowanie',
          correct: 0,
          incorrect: 0
        },
        {
          name: 'Pieniądze i zakupy',
          correct: 0,
          incorrect: 0
        },
        {
          name: 'Uzupełnianie luk',
          correct: 0,
          incorrect: 0
        },
        {
          name: 'Figury geometryczne',
          correct: 0,
          incorrect: 0
        },
        {
          name: 'Kalendarz i czas',
          correct: 0,
          incorrect: 0
        },
      ],
      2: [
        {
          name: 'Porównywanie liczb',
          correct: 0,
          incorrect: 0
        },
        {
          name: 'Dodawanie i odejmowanie',
          correct: 0,
          incorrect: 0
        },
        {
          name: 'Mnożenie i dzielenie',
          correct: 0,
          incorrect: 0,
        },
        {
          name: 'Pieniądze i zakupy',
          correct: 0,
          incorrect: 0,
        },
        {
          name: 'Uzupełnij lukę',
          correct: 0,
          incorrect: 0,
        },
        {
          name: 'Liczby rzymskie',
          correct: 0,
          incorrect: 0,
        },
        {
          name: 'Termometr',
          correct: 0,
          incorrect: 0,
        },
      ]
    };
  }

  get list() {
    return {
      1: [
        {
          name: 'Liczenie przedmiotów',
          component: LiczeniePrzedmiotow
        },
        {
          name: 'Porównywanie liczb',
          component: 0
        },
        {
          name: 'Dodawanie i odejmowanie',
          component: 0
        },
        {
          name: 'Pieniądze i zakupy',
          component: 0
        },
        {
          name: 'Uzupełnianie luk',
          component: 0
        },
        {
          name: 'Figury geometryczne',
          component: 0
        },
        {
          name: 'Kalendarz i czas',
          component: 0
        },
      ],
      2: [
        {
          name: 'Porównywanie liczb',
          component: 0
        },
        {
          name: 'Dodawanie i odejmowanie',
          component: 0
        },
        {
          name: 'Mnożenie i dzielenie',
          component: 0
        },
        {
          name: 'Pieniądze i zakupy',
          component: 0
        },
        {
          name: 'Uzupełnianie luk',
          component: 0
        },
        {
          name: 'Liczby rzymskie',
          component: 0
        },
        {
          name: 'Termometr',
          component: 0
        },
      ]
    };
  }

  getAwards(correct) {
    if(correct < 1) {
      return 0;
    } else if(correct < 3) {
      return 1;
    } else if(correct < 6) {
      return 2;
    } else if(correct < 11) {
      return 3;
    } else {
      return 4 + Math.floor((correct - 11) / 10);
    }
  }

  getLeftToAward(correct) {
    if(correct < 1) {
      return 1;
    } else if(correct < 3) {
      return 3 - correct;
    } else if(correct < 6) {
      return 6 - correct;
    } else if(correct < 11) {
      return 11 - correct;
    } else {
      return 10 - correct % 11 === 0 ? 10 : 10 - correct % 11;
    }
  }

  addCorrect(classNumber, gameIndex) {
    this.state[classNumber][gameIndex].correct++;
    this.saveToLocalStorage();
  }

  addIncorrect(classNumber, gameIndex) {
    this.state[classNumber][gameIndex].incorrect++;
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('games', JSON.stringify(this.state));
  }
}

export default new GamesState();
