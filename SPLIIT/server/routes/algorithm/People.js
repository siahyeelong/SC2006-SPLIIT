class Person {
    constructor(identifier, displayName, favColour) {
        this.identifier = identifier;
        this.displayName = displayName;
        this.favColour = favColour;
    }
}

export const People = {}
People['person1'] = new Person('person1', "Person 1 name", '#FA9189');
People['person2'] = new Person('person2', "Person two", '#FCAE7C');
People['person3'] = new Person('person3', "User 3", '#FFE699');
People['person4'] = new Person('person4', "user 4", '#F9FFB5');
People['person5'] = new Person('person5', "5th person", '#B3F5BC');
People['person6'] = new Person('person6', "sixth person", '#D6F6FF');
People['person7'] = new Person('person7', "person number 7", '#E2CBF7');
People['person8'] = new Person('person8', "person8", '#D1BDFF');
People['person9'] = new Person('person9', "nine person", '#B3F5BC');
People['person10'] = new Person('person10', "10th person", '#E2CBF7');
People['person11'] = new Person('person11', "11th user", '#D6F6FF');