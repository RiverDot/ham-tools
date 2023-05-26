declare global {
    /*~ Here, declare things that go in the global namespace, or augment
     *~ existing declarations in the global namespace
     */
    type UserInfo = {
        pos: Cords
    }

    type CQInfo = {
        name: string,
        address1: string,
        address2: string,
        pos: Cords
    }

    type Cords = {
        lat: number,
        lon: number
    }
}

export {};