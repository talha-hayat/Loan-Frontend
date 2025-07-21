import { Field, ErrorMessage } from 'formik';

export default function TermsSection() {
  return (
    <section>
      <div className="flex items-start mt-6">
        <Field type="checkbox" name="agreeTerms" className="h-5 w-5 text-green-600 rounded border-gray-300" />
        <div className="ml-3 text-sm">
          <label htmlFor="agreeTerms" className="font-medium text-gray-700">
            I agree to the <a href="#" className="text-green-600 hover:text-green-800">terms and conditions</a> and authorize verification *
          </label>
          <ErrorMessage name="agreeTerms" component="div" className="text-red-600 text-sm mt-1" />
        </div>
      </div>
    </section>
  );
}
