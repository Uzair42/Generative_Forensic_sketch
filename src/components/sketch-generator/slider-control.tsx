'use client';

import type { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import type { SketchFormValues } from './sketch-schema';

interface SliderControlProps {
  control: Control<SketchFormValues>;
  name: keyof SketchFormValues;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
}

export function SliderControl({ 
  control, 
  name, 
  label, 
  min = 1, 
  max = 10, 
  step = 1,
  onValueChange 
}: SliderControlProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, ...field } }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>{label}</FormLabel>
            <span className="text-sm font-medium text-muted-foreground">{Array.isArray(value) ? value[0] : value}</span>
          </div>
          <FormControl>
            <Slider
              min={min}
              max={max}
              step={step}
              value={Array.isArray(value) ? value : [value]}
              onValueChange={onValueChange}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
