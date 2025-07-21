export default function ProgressBar({ currentStep }) {
  const steps = ['Loan Details', 'Personal Info', 'Financial Info', 'Review'];
  return (
    <div className="bg-green-500 px-6 py-4 flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${index < currentStep ? 'bg-green-900 text-white' : 'bg-white text-green-700 border border-green-700'}`}>
            {index + 1}
          </div>
          <span className={`ml-2 text-sm font-medium ${index < currentStep ? 'text-white' : 'text-green-100'}`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}
