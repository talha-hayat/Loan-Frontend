import { Field, ErrorMessage } from 'formik';

export default function LoanDetailsSection({ errors, touched }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Loan Details</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Loan Type *</label>
          <Field as="select" name="loanType" className="form-input">
            <option value="">Select</option>
            <option value="personal">Personal Loan</option>
            <option value="business">Business Loan</option>
            <option value="education">Education Loan</option>
            <option value="auto">Auto Loan</option>
            <option value="home">Home Loan</option>
          </Field>
          <ErrorMessage name="loanType" component="div" className="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount (Rs) *</label>
          <Field name="amount" type="number" className="form-input" placeholder="50000" />
          <ErrorMessage name="amount" component="div" className="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tenure (Months) *</label>
          <Field name="tenure" type="number" className="form-input" placeholder="12" />
          <ErrorMessage name="tenure" component="div" className="text-red-600 text-sm mt-1" />
        </div>
      </div>
    </section>
  );
}
