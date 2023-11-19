type MultiStepAuthManagerProps = {
  step: number;
  stepComponents: React.ReactNode[];
};

export default function MultiStepAuthManager({
  step,
  stepComponents,
}: MultiStepAuthManagerProps) {
  return (
    <div className="w-full">
      {step === 1 && stepComponents[0]}
      {step === 2 && stepComponents[1]}
      {step === 3 && stepComponents[2]}
    </div>
  );
}
