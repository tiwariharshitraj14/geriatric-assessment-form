import { describe, expect, it } from 'vitest';
import { assessmentSchema } from './schema';

describe('assessmentSchema', () => {
  it('accepts a patient aged exactly 60 on the assessment date', () => {
    const result = assessmentSchema.safeParse({
      mrn: 'MRN-004821',
      patientName: 'Sample Patient',
      dateOfBirth: '1966-08-07',
      assessmentDate: '2026-08-07',
      mobility: 'cane',
      barthelIndex: 80,
      medicationCount: 3,
      pharmacistReviewRequested: false,
      followUpDate: '2026-09-04',
      consentObtained: true,
    });

    expect(result.success).toBe(true);
  });

  it('rejects a patient who is one day short of age 60', () => {
    const result = assessmentSchema.safeParse({
      mrn: 'MRN-004821',
      patientName: 'Sample Patient',
      dateOfBirth: '1966-08-08',
      assessmentDate: '2026-08-07',
      mobility: 'cane',
      barthelIndex: 80,
      medicationCount: 3,
      pharmacistReviewRequested: false,
      followUpDate: '2026-09-04',
      consentObtained: true,
    });

    expect(result.success).toBe(false);
  });
});
