import React from 'react';
import { Steps, Hints } from 'intro.js-react';
import { useRouter } from 'next/router';
interface IntroGuideProps {
  steps: Array<{
    element: string;
    intro: string;
    position?: string;
  }>;
  disableInteraction?: boolean;
  stepsEnabled: boolean;
  stepsName: string;
  onExit: () => void;
}

const IntroGuide: React.FC<IntroGuideProps> = ({
  steps,
  stepsEnabled,
  onExit,
  stepsName,
}) => {
  const router = useRouter();
  const handleStepChange = (stepIndex: number) => {
    if (stepIndex === 7 && stepsName === 'appSteps') {
      onExit();
      router.push('/users/users-list/');
    } else if (stepIndex === 2 && stepsName === 'usersSteps') {
      onExit();
      router.push('/roles/roles-list/');
    }
  };

  const handleExit = () => {
    localStorage.setItem(`completed_${stepsName}`, 'true');
    onExit();
  };
  return (
    <>
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={0}
        onExit={handleExit}
        onChange={handleStepChange}
      />
    </>
  );
};

export default IntroGuide;
