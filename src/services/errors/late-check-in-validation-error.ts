export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      'Check-in is late for validation. It must be validated within 20 minutes.',
    )
  }
}
