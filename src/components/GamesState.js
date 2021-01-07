import LiczeniePrzedmiotow from '../games/11LiczeniePrzedmiotow';
import PorownywanieLiczb from '../games/12PorownywanieLiczb';
import DodawanieIOdejmowanie from '../games/13DodawanieIOdejmowanie';
import DodawanieIOdejmowanie2 from '../games/22DodawanieIOdejmowanie';
import UzupelnianieLuk from '../games/15UzupelnianieLuk';
import MnozenieIDzielenie from '../games/23MnozenieIDzielenie';
import FiguryGeometryczne from '../games/16FiguryGeometryczne';
import PorownywanieLiczb2 from '../games/21PorownywanieLiczb';
import UzupelnianieLuk2 from '../games/25UzupelnianieLuk';

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
          component: PorownywanieLiczb
        },
        {
          name: 'Dodawanie i odejmowanie',
          component: DodawanieIOdejmowanie
        },
        {
          name: 'Pieniądze i zakupy',
          component: 0
        },
        {
          name: 'Uzupełnianie luk',
          component: UzupelnianieLuk
        },
        {
          name: 'Figury geometryczne',
          component: FiguryGeometryczne
        },
        {
          name: 'Kalendarz i czas',
          component: 0
        },
      ],
      2: [
        {
          name: 'Porównywanie liczb',
          component: PorownywanieLiczb2
        },
        {
          name: 'Dodawanie i odejmowanie',
          component: DodawanieIOdejmowanie2
        },
        {
          name: 'Mnożenie i dzielenie',
          component: MnozenieIDzielenie
        },
        {
          name: 'Pieniądze i zakupy',
          component: 0
        },
        {
          name: 'Uzupełnianie luk',
          component: UzupelnianieLuk2
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

  isReadyToDiploma(classNumber, gameIndex) {
    return this.state[classNumber][gameIndex].correct > this.state[classNumber][gameIndex].incorrect
      && this.getAwards(this.state[classNumber][gameIndex].correct) > 0;
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
