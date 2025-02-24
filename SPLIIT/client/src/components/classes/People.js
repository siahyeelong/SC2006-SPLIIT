export class Person {
    constructor(identifier, displayName, favColour) {
        this.identifier = identifier;
        this.displayName = displayName;
        this.favColour = favColour;
    }

    static findDisplayName(identifier, people) {
        const person = people.find(person => person.identifier === identifier);
        return person ? person.displayName : 'Not found';
    }

    static findFavColour(identifier, people) {
        const person = people.find(person => person.identifier === identifier);
        return person ? person.favColour : '#CCCCCC';
    }
}

export const People = [
    new Person('graycemom', "Grayce's Mom", '#FA9189'),
    new Person('graycedad', "Grayce's Dad", '#FCAE7C'),
    new Person('ylmom', "YL's Mom", '#FFE699'),
    new Person('yldad', "YL's Dad", '#F9FFB5'),
    new Person('yuxiang', "Yu Xiang", '#B3F5BC'),
    new Person('danning', "Dan Ning", '#D6F6FF'),
    new Person('yutian', "Yu Tian", '#E2CBF7'),
    new Person('chubby', "Chubby", '#D1BDFF'),
    new Person('sinlu', "Sin Lu", '#B3F5BC'),
    new Person('grayce', "grayce", '#E2CBF7'),
    new Person('yl', "yl", '#D6F6FF'),
];
