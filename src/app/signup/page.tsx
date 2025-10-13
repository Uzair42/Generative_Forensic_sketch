import Link from 'next/link';
import { AuthCard } from '@/components/auth/auth-card';
import { SignUpForm } from '@/components/auth/signup-form';

export default function SignUpPage() {
  return (
    <AuthCard
      title="Create an Account"
      description="Enter your email and password to get started."
      footer={
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Link href="/signin" className="font-medium text-primary hover:underline">
            Sign In
          </Link>
        </p>
      }
    >
      <SignUpForm />
    </AuthCard>
  );
}
