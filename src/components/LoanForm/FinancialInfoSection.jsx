import { Field, ErrorMessage } from 'formik';

export default function FinancialInfoSection() {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Financial Information</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Employment Status *</label>
          <Field as="select" name="employmentStatus" className="form-input">
            <option value="">Select</option>
            <option value="salaried">Salaried</option>
            <option value="self-employed">Self Employed</option>
            <option value="business">Business Owner</option>
            <option value="student">Student</option>
            <option value="unemployed">Unemployed</option>
          </Field>
          <ErrorMessage name="employmentStatus" component="div" className="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Monthly Income (Rs) *</label>
          <Field name="monthlyIncome" type="number" className="form-input" placeholder="30000" />
          <ErrorMessage name="monthlyIncome" component="div" className="text-red-600 text-sm mt-1" />
        </div>
      </div>
    </section>
  );
}
