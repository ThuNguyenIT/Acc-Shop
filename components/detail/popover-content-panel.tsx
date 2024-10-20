import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  PopoverContent,
} from '@/components/ui/popover';
import { Minus, Plus, Check } from 'lucide-react';
import { useLayoutStore } from '@/lib';

interface IState {
  selectedColor: string;
  selectedFont: string;
  fontSize: number;
}
interface IColor {
  value: string;
  class: string;
  colorHex: string;
}

const colors: IColor[] = [
  { value: 'red-500', class: 'bg-red-500', colorHex: '#EF4444' },
  { value: 'yellow-200', class: 'bg-yellow-200', colorHex: '#FEF08A' },
  { value: 'green-200', class: 'bg-green-200', colorHex: '#BBF7D0' },
  { value: 'blue-200', class: 'bg-blue-200', colorHex: '#BFDBFE' },
  { value: 'pink-200', class: 'bg-pink-200', colorHex: '#FBCFE8' },
  { value: 'black', class: 'bg-black', colorHex: '#000000' }
];

const fonts: string[] = ['Roboto', 'Palatino', 'Times'];
export default function PopoverContentPanel() {
  const {
    textColor,
    fontSize,
    fontFamily,
    setTextColor,
    setFontSize,
    setFontFamily
  } = useLayoutStore();
  const [state, setState] = useState<IState>({
    selectedColor: textColor,
    selectedFont: fontFamily,
    fontSize: fontSize
  });
  const handleSetStateField = useCallback(
    (field: keyof IState, value: string | number) => {
      setState((prevState) => ({ ...prevState, [field]: value }));
    },
    []
  );

  const handleChooseColor = useCallback((color: string) => {
    setTextColor(color);
    handleSetStateField('selectedColor', color);
  }, []);
  const handleChooseFont = useCallback((font: string) => {
    setFontFamily(font);
    handleSetStateField('selectedFont', font);
  }, []);
  const handleSetFontSize = useCallback((fontSize: number) => {
    setFontSize(fontSize);
    handleSetStateField('fontSize', fontSize);
  }, []);

  return (
    <PopoverContent className="w-100 bg-light-blue">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-sm font-medium">Màu sắc:</h3>
          <div className="flex space-x-2">
            {colors.map((color) => (
              <button
                key={color.value}
                className={`h-6 w-6 rounded-full ${color.class} flex items-center justify-center border border-custom-red`}
                onClick={() => handleChooseColor(color.colorHex)}
              >
                {state.selectedColor === color.colorHex && (
                  <Check className="h-4 w-4 text-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <h3 className="text-sm font-medium">Font chữ:</h3>
          <div className="flex space-x-2">
            {fonts.map((font) => (
              <button
                key={font}
                className={`rounded border bg-transparent px-3 py-1 ${state.selectedFont === font
                  ? 'border-custom-red text-custom-red'
                  : ''
                  }`}
                onClick={() => handleChooseFont(font)}
              >
                {font}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <h3 className="text-sm font-medium">Cỡ chữ:</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 rounded-full border-black"
              onClick={() =>
                handleSetFontSize(Math.max(state.fontSize - 1, 12))
              }
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{state.fontSize}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 rounded-full border-black"
              onClick={() =>
                handleSetFontSize(Math.min(state.fontSize + 1, 32))
              }
            >
              <Plus className="h-4 w-4 text-black" />
            </Button>
          </div>
        </div>
      </div>
    </PopoverContent>
  );
}
