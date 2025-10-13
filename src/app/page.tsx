import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SlidersHorizontal, Sparkles, Lock } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: <SlidersHorizontal className="h-10 w-10 text-primary" />,
    title: 'Advanced Controls',
    description: 'Fine-tune every facial detail with intuitive sliders and options to create the perfect sketch.',
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: 'AI-Powered Generation',
    description: 'Leverage state-of-the-art AI to generate hyper-realistic forensic sketches in seconds.',
  },
  {
    icon: <Lock className="h-10 w-10 text-primary" />,
    title: 'Secure and Private',
    description: 'Your work is protected. All generations are secure and linked to your account.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-background">
      <section className="w-full">
        <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-20 md:grid-cols-2 md:py-32">
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
              Generate Forensic Sketches with AI
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Bring descriptions to life. Our powerful AI tool helps law enforcement and creative professionals generate high-quality forensic sketches from textual descriptions with unparalleled accuracy.
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href="/sketch-generator">Get Started</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-2xl md:h-[400px]">
            <Image
              src="https://picsum.photos/seed/hero-image/1200/800"
              alt="AI generated forensic sketch example"
              fill
              className="object-cover"
              data-ai-hint="forensic sketch"
            />
          </div>
        </div>
      </section>
      
      <section className="w-full bg-card py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              A New Paradigm in Criminal Identification
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              SketchAI provides a comprehensive suite of tools for modern forensic art.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="flex flex-col items-center text-center p-6 border-2 border-transparent hover:border-primary transition-all hover:shadow-xl">
                <CardHeader className="p-0">
                  {feature.icon}
                </CardHeader>
                <CardContent className="p-0 mt-6">
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-24">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
              Ready to Start?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
             Create an account and start generating your first sketch in minutes.
            </p>
            <div className="mt-10">
            <Button asChild size="lg" variant="default">
              <Link href="/signup">Sign Up Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
