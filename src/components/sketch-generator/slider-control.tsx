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
      render={({ field }) => {
        const valueAsNumber = typeof field.value === 'string' ? parseFloat(field.value) : field.value;
        const valueAsArray = Array.isArray(valueAsNumber) ? valueAsNumber : [valueAsNumber || 0];

        return (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>{label}</FormLabel>
              <span className="text-sm font-medium text-muted-foreground">{valueAsArray[0]}</span>
            </div>
            <FormControl>
              <Slider
                min={min}
                max={max}
                step={step}
                value={valueAsArray}
                onValueChange={(newValue) => {
                  field.onChange(newValue[0]);
                  if (onValueChange) {
                    onValueChange(newValue);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
