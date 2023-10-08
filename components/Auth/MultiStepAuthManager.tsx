type MultiStepAuthManagerProps = {
  isLoaded: boolean;
  step: number;
  stepComponents: React.ReactNode[];
};

export default function MultiStepAuthManager({
  isLoaded,
  step,
  stepComponents
}: MultiStepAuthManagerProps) {
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {step === 1 && stepComponents[0]}
      {step === 2 && stepComponents[1]}
      {step === 3 && stepComponents[2]}
    </>
  );
}
