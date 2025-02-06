class PeopleClass {
    constructor() {
        this.group = {}
    }
    setPersonData(person, name, colour) {
        this.group[person] = { displayName: name, favColour: colour };
    }
    getPersonData(person) {
        return this.group[person] || null;  // Return person data or null if not found
    }

    getAllPeople() {
        return Object.entries(this.group).map(([key, value]) => ({
            personKey: key,
            ...value
        }));
    }

}

export const People = new PeopleClass();
People.setPersonData('graycemom', "Grayce's Mom", '#FA9189');
People.setPersonData('graycedad', "Grayce's Dad", '#FCAE7C');
People.setPersonData('ylmom', "YL's Mom", '#FFE699');
People.setPersonData('yldad', "YL's Dad", '#F9FFB5');
People.setPersonData('yuxiang', "Yu Xiang", '#B3F5BC');
People.setPersonData('danning', "Dan Ning", '#D6F6FF');
People.setPersonData('yutian', "Yu Tian", '#E2CBF7');
People.setPersonData('chubby', "Chubby", '#D1BDFF');
People.setPersonData('sinlu', "Sin Lu", '#B3F5BC');
People.setPersonData('grayce', "grayce", '#E2CBF7');
People.setPersonData('yl', "yl", '#D6F6FF');