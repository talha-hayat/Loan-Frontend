import { Field, ErrorMessage } from 'formik';

export default function PersonalInfoSection() {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Personal Information</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name *</label>
          <Field name="firstName" className="form-input" />
          <ErrorMessage name="firstName" component="div" className="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name *</label>
          <Field name="lastName" className="form-input" />
          <ErrorMessage name="lastName" component="div" className="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <Field name="email" type="email" className="form-input" />
          <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone (+92) *</label>
          <Field name="phone" type="tel" className="form-input" placeholder="3001234567" />
          <ErrorMessage name="phone" component="div" className="text-red-600 text-sm mt-1" />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address *</label>
          <Field as="textarea" name="address" rows={3} className="form-input" />
          <ErrorMessage name="address" component="div" className="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">City *</label>
          <Field name="city" className="form-input" />
          <ErrorMessage name="city" component="div" className="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Province *</label>
          <Field as="select" name="province" className="form-input">
            <option value="">Select Province</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="KPK">Khyber Pakhtunkhwa</option>
            <option value="Balochistan">Balochistan</option>
            <option value="Islamabad">Islamabad Capital Territory</option>
            <option value="AJK">Azad Kashmir</option>
          </Field>
          <ErrorMessage name="province" component="div" className="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Postal Code *</label>
          <Field name="postalCode" type="text" className="form-input" placeholder="54000" />
          <ErrorMessage name="postalCode" component="div" className="text-red-600 text-sm mt-1" />
        </div>
      </div>
    </section>
  );
}
