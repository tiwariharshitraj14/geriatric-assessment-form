import { useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Code,
  Container,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { assessmentSchema, MOBILITY, type Assessment } from './features/assessment/schema';

type FormValues = {
  mrn: string;
  patientName: string;
  dateOfBirth: string;
  assessmentDate: string;
  mobility: string;
  barthelIndex: number | '';
  medicationCount: number | '';
  pharmacistReviewRequested: boolean;
  followUpDate: string;
  consentObtained: boolean;
};

const samplePatient: FormValues = {
  mrn: 'MRN-004821',
  patientName: 'Sushila Deshpande',
  dateOfBirth: '1949-03-12',
  assessmentDate: '2026-08-07',
  mobility: 'cane',
  barthelIndex: 80,
  medicationCount: 3,
  pharmacistReviewRequested: false,
  followUpDate: '2026-09-04',
  consentObtained: true,
};

const mobilityOptions = MOBILITY.map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export default function App() {
  const [loading, setLoading] = useState(false);
  const [savedAssessment, setSavedAssessment] = useState<Assessment | null>(null);

  const form = useForm<FormValues>({
    mode: 'controlled',
    initialValues: {
      mrn: '',
      patientName: '',
      dateOfBirth: '',
      assessmentDate: '',
      mobility: '',
      barthelIndex: '',
      medicationCount: '',
      pharmacistReviewRequested: false,
      followUpDate: '',
      consentObtained: false,
    },
    validateInputOnBlur: true,
    validateInputOnChange: false,
    validate: (values) => {
      const result = assessmentSchema.safeParse(values);

      if (result.success) {
        return {};
      }

      return Object.fromEntries(
        result.error.issues.map((issue) => [String(issue.path[0]), issue.message])
      );
    },
  });

  const loadSamplePatient = () => {
    form.setValues(samplePatient);
    form.clearErrors();
    setSavedAssessment(null);
  };

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    setSavedAssessment(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const result = assessmentSchema.safeParse(values);

      if (result.success) {
        setSavedAssessment(result.data);
      } else {
        form.setErrors(
          Object.fromEntries(
            result.error.issues.map((issue) => [String(issue.path[0]), issue.message])
          )
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="md" py="xl">
      <Paper withBorder shadow="sm" radius="md" p="xl">
        <Stack gap="lg">
          <div>
            <Title order={1}>Geriatric Care Assessment</Title>
            <Text c="dimmed" mt="xs">
              Complete the patient assessment details below.
            </Text>
          </div>

          <Group>
            <Button variant="light" onClick={loadSamplePatient} disabled={loading}>
              Load sample patient
            </Button>
          </Group>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Medical record number"
                placeholder="MRN-004821"
                {...form.getInputProps('mrn')}
              />

              <TextInput label="Patient name" {...form.getInputProps('patientName')} />

              <DateInput
                label="Date of birth"
                placeholder="Select date of birth"
                value={form.values.dateOfBirth || null}
                onChange={(value) => form.setFieldValue('dateOfBirth', value ?? '')}
                error={form.errors.dateOfBirth}
                valueFormat="YYYY-MM-DD"
                clearable
              />

              <DateInput
                label="Assessment date"
                placeholder="Select assessment date"
                maxDate={new Date()}
                value={form.values.assessmentDate || null}
                onChange={(value) => form.setFieldValue('assessmentDate', value ?? '')}
                error={form.errors.assessmentDate}
                valueFormat="YYYY-MM-DD"
                clearable
              />

              <Select
                label="Mobility"
                placeholder="Select mobility status"
                data={mobilityOptions}
                value={form.values.mobility || null}
                onChange={(value) => form.setFieldValue('mobility', value ?? '')}
                error={form.errors.mobility}
                clearable
              />

              <NumberInput
                label="Barthel Index"
                placeholder="Enter a score from 0 to 100"
                min={0}
                max={100}
                step={5}
                allowDecimal={false}
                allowNegative={false}
                value={form.values.barthelIndex}
                onChange={(value) =>
                  form.setFieldValue('barthelIndex', value === '' ? '' : Number(value))
                }
                error={form.errors.barthelIndex}
              />

              <NumberInput
                label="Regular medications"
                placeholder="Enter medication count"
                min={0}
                max={30}
                allowDecimal={false}
                allowNegative={false}
                value={form.values.medicationCount}
                onChange={(value) =>
                  form.setFieldValue('medicationCount', value === '' ? '' : Number(value))
                }
                error={form.errors.medicationCount}
              />

              <Checkbox
                label="Pharmacist review requested"
                checked={form.values.pharmacistReviewRequested}
                onChange={(event) =>
                  form.setFieldValue('pharmacistReviewRequested', event.currentTarget.checked)
                }
                error={form.errors.pharmacistReviewRequested}
              />

              <DateInput
                label="Next review date"
                placeholder="Select next review date"
                value={form.values.followUpDate || null}
                onChange={(value) => form.setFieldValue('followUpDate', value ?? '')}
                error={form.errors.followUpDate}
                valueFormat="YYYY-MM-DD"
                clearable
              />

              <Checkbox
                label="Patient or representative has given consent"
                checked={form.values.consentObtained}
                onChange={(event) =>
                  form.setFieldValue('consentObtained', event.currentTarget.checked)
                }
                error={form.errors.consentObtained}
              />

              <Button type="submit" loading={loading} fullWidth>
                Save assessment
              </Button>
            </Stack>
          </form>

          {savedAssessment && (
            <Alert color="green" title="Assessment saved successfully">
              <Text size="sm" mb="sm">
                The validated assessment data is shown below.
              </Text>
              <Code block>{JSON.stringify(savedAssessment, null, 2)}</Code>
            </Alert>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}
