export class Airline {
    constructor(
        public id = '',
        public logo = '',
        public name = '',
        public slogan = '',
    ) {}
}

export interface AirlineResponse {
    totalAmount: number;
    airlines: Airline[];
}