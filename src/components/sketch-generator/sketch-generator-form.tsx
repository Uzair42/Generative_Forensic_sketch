'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2 } from 'lucide-react';

import { SliderControl } from './slider-control';
import { sketchSchema, type SketchFormValues } from './sketch-schema';
import { ETHNICITIES } from '@/lib/constants';

interface SketchGeneratorFormProps {
  onSubmit: (data: SketchFormValues) => void;
  isGenerating: boolean;
  disabled: boolean;
}

export function SketchGeneratorForm({ onSubmit, isGenerating, disabled }: SketchGeneratorFormProps) {
  const form = useForm<SketchFormValues>({
    resolver: zodResolver(sketchSchema),
    defaultValues: {
      gender: 'Male',
      age: 35,
      ethnicity: 'European',
      eyePosition: 5,
      eyeSlant: 5,
      eyeSize: 5,
      noseWidth: 5,
      noseBridge: 5,
      lipThickness: 5,
      lipWidth: 5,
      jawShape: 5,
      jawProminence: 5,
      wrinkles: 3,
      facialHair: 1,
    },
  });
  
  const handleSliderChange = (name: keyof SketchFormValues, value: number[]) => {
    form.setValue(name, value[0]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <fieldset disabled={disabled || isGenerating} className="space-y-6">
          <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full">
            {/* General Information */}
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">General Information</AccordionTrigger>
              <AccordionContent className="space-y-6 pt-4">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl><RadioGroupItem value="Male" /></FormControl>
                            <FormLabel className="font-normal">Male</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl><RadioGroupItem value="Female" /></FormControl>
                            <FormLabel className="font-normal">Female</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl><RadioGroupItem value="Other" /></FormControl>
                            <FormLabel className="font-normal">Other</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SliderControl control={form.control} name="age" label="Approximate Age" min={18} max={80} onValueChange={(val) => handleSliderChange('age', val)}/>
                <FormField
                  control={form.control}
                  name="ethnicity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ethnicity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select an ethnicity" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ETHNICITIES.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>

            {/* Facial Features */}
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">Facial Features</AccordionTrigger>
              <AccordionContent className="space-y-6 pt-4">
                <h4 className="font-medium">Eyes</h4>
                <SliderControl control={form.control} name="eyePosition" label="Position (Narrow/Wide)" onValueChange={(val) => handleSliderChange('eyePosition', val)} />
                <SliderControl control={form.control} name="eyeSlant" label="Slant (Downward/Upward)" onValueChange={(val) => handleSliderChange('eyeSlant', val)} />
                <SliderControl control={form.control} name="eyeSize" label="Size (Small/Large)" onValueChange={(val) => handleSliderChange('eyeSize', val)} />
                
                <h4 className="font-medium pt-4">Nose</h4>
                <SliderControl control={form.control} name="noseWidth" label="Width (Thin/Wide)" onValueChange={(val) => handleSliderChange('noseWidth', val)} />
                <SliderControl control={form.control} name="noseBridge" label="Bridge (Straight/Hooked)" onValueChange={(val) => handleSliderChange('noseBridge', val)} />

                <h4 className="font-medium pt-4">Lips</h4>
                <SliderControl control={form.control} name="lipThickness" label="Thickness (Thin/Full)" onValueChange={(val) => handleSliderChange('lipThickness', val)} />
                <SliderControl control={form.control} name="lipWidth" label="Width (Narrow/Wide)" onValueChange={(val) => handleSliderChange('lipWidth', val)} />

                <h4 className="font-medium pt-4">Jawline</h4>
                <SliderControl control={form.control} name="jawShape" label="Shape (Square/Round)" onValueChange={(val) => handleSliderChange('jawShape', val)} />
                <SliderControl control={form.control} name="jawProminence" label="Prominence (Weak/Strong)" onValueChange={(val) => handleSliderChange('jawProminence', val)} />
              </AccordionContent>
            </AccordionItem>

            {/* Other Details */}
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold">Other Details</AccordionTrigger>
              <AccordionContent className="space-y-6 pt-4">
                <SliderControl control={form.control} name="wrinkles" label="Wrinkles / Age Detail" onValueChange={(val) => handleSliderChange('wrinkles', val)} />
                <SliderControl control={form.control} name="facialHair" label="Facial Hair" onValueChange={(val) => handleSliderChange('facialHair', val)} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </fieldset>
        
        <Button type="submit" size="lg" className="w-full" disabled={disabled || isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Refining...
            </>
          ): (
            'Refine Sketch with Sliders'
          )}
        </Button>
        {disabled && !isGenerating && (
           <p className="text-center text-sm text-muted-foreground">
            Generate an initial sketch first to enable refinement controls.
           </p>
        )}
      </form>
    </Form>
  );
}
