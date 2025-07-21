import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ProgressBar from './ProgressBar';
import LoanDetailsSection from './LoanDetailsSection';
import PersonalInfoSection from './PersonalInfoSection';
import FinancialInfoSection from './FinancialInfoSection';
import TermsSection from './TermsSection';

const validationSchema = Yup.object({
  loanType: Yup.string().required('Loan type is required'),
  amount: Yup.number().min(10000, 'Minimum Rs. 10,000').required('Amount is required'),
  tenure: Yup.number().min(6, 'Min 6 months').max(60, 'Max 60 months').required('Tenure is required'),
  
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, '10 digit Pakistani mobile number').required('Phone is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  province: Yup.string().required('Province is required'),
  postalCode: Yup.string().matches(/^[0-9]{5}$/, '5 digit postal code').required('Postal Code is required'),

  employmentStatus: Yup.string().required('Employment status is required'),
  monthlyIncome: Yup.number().min(5000, 'Minimum Rs. 5,000').required('Monthly income is required'),

  agreeTerms: Yup.boolean().oneOf([true], 'You must accept terms')
});

const initialValues = {
  loanType: '',
  amount: '',
  tenure: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  employmentStatus: '',
  monthlyIncome: '',
  agreeTerms: false
};

export default function LoanForm() {
  const handleSubmit = (values) => {
    console.log('Submitting:', values);
    alert('Application submitted!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <ProgressBar currentStep={1} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="p-6 sm:p-8 space-y-10">
              <LoanDetailsSection errors={errors} touched={touched} />
              <PersonalInfoSection errors={errors} touched={touched} />
              <FinancialInfoSection errors={errors} touched={touched} />
              <TermsSection errors={errors} touched={touched} />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-800 transition duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
