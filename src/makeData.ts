// src/makeData.ts
import { faker } from "@faker-js/faker";

export interface Person {
  id: string;
  name: string;
  billingAddress: string;
  phoneNumber: string;
  email: string;
}

export const makeData = (length: number): Person[] =>
  Array.from(
    { length },
    (): Person => ({
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      billingAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
    })
  );
