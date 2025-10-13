import Link from 'next/link';
import { AuthCard } from '@/components/auth/auth-card';
import { SignInForm } from '@/components/auth/signin-form';

export default function SignInPage() {
  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to your account to continue."
      footer={
        <p className="text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      }
    >
      <SignInForm />
    </AuthCard>
  );
}
