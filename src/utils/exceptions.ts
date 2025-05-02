
// Custom exceptions for the Farm Management System

export class InvalidLoginException extends Error {
  constructor(message: string = 'Invalid username or password') {
    super(message);
    this.name = 'InvalidLoginException';
  }
}

export class InvalidInputException extends Error {
  constructor(message: string = 'Invalid input provided') {
    super(message);
    this.name = 'InvalidInputException';
  }
}

export class AnimalNotFoundException extends Error {
  constructor(animalId: string) {
    super(`Animal with ID ${animalId} not found`);
    this.name = 'AnimalNotFoundException';
  }
}
