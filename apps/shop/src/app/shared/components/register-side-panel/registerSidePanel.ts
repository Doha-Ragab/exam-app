import { Component, input } from '@angular/core';

export interface PromoFeature {
  icon: string;
  title: string;
  description: string;
}
@Component({
  selector: 'app-register-side-panel',
  imports: [],
  templateUrl: './registerSidePanel.html',
  styleUrl: './registerSidePanel.css',
})

export class RegisterSidePanel {
  brandName = input<string>('Exam App');
  headline = input<string>(
    'Empower your learning journey with our smart exam platform.'
  );
  features = input<PromoFeature[]>([
    {
      icon: '🎓',
      title: 'Tailored Diplomas',
      description:
        'Choose from specialized tracks like Frontend, Backend, and Mobile Development.',
    },
    {
      icon: '📝',
      title: 'Focused Exams',
      description:
        'Assess topic-specific tests including HTML, CSS, JavaScript, and more.',
    },
    {
      icon: '⚡',
      title: 'Smart Multi-Step Forms',
      description: 'Complete smooth step-by-step onboarding.',
    },
  ]);
}

