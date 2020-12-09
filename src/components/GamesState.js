class GamesState {

  constructor() {
    if (localStorage.getItem('games') === null) {
      this.state = this.defaultState;
    } else {
      this.state = JSON.parse(localStorage.getItem('games'));
    }
  }

  get defaultState() {
    return {
      1: [
        {
          name: 'Dodawanie i odejmowanie',
          correct: 0,
          incorrect: 0
        },
        {
          name: 'Dodawanie i odejmowanie',
          correct: 0,
          incorrect: 0
        },
        {
          name: 'Dodawanie i odejmowanie',
          correct: 0,
          incorrect: 0
        },
      ],
      2: [
        {
          name: 'Dodawanie i odejmowanie',
          correct: 0,
          incorrect: 0
        },
        {
          name: 'Dodawanie i odejmowanie',
          correct: 0,
          incorrect: 0
        },
        {
          name: 'Dodawanie i odejmowanie',
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
          name: 'Dodawanie i odejmowanie',
          route: 0,
          component: 0
        },
        {
          name: 'Dodawanie i odejmowanie',
          route: 0,
          component: 0
        },
        {
          name: 'Dodawanie i odejmowanie',
          route: 0,
          component: 0
        },
        {
          name: 'Dodawanie i odejmowanie',
          route: 0,
          component: 0
        },
        {
          name: 'Dodawanie i odejmowanie',
          route: 0,
          component: 0
        },
        {name: 'DD'},
        {name: 'XX'}
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

  saveToLocalStorage() {
    localStorage.setItem('games', JSON.stringify(this.state));
  }
}

export default new GamesState();
