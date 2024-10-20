'use client';
import React, { useCallback, useState } from 'react'
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from '../ui/dialog'
import Image from 'next/image';
import { Genders, useHomeStore } from '@/lib';


interface IState {
  open: boolean
  selected: Genders | null
}
export default function StoryPreferenceModal() {

  const { targetGender, setTargetGender } = useHomeStore();
  const [state, setState] = useState<IState>({
    open: targetGender === null,
    selected: null
  })

  const handleSetStateField = useCallback(
    (field: keyof IState, value: Genders | boolean | null) => {
      setState((prevState) => ({ ...prevState, [field]: value }))
    },
    []
  )

  const handleSelect = useCallback((gender: Genders) => {

    handleSetStateField('selected', gender);
  }, []);

  const handleSubmit = useCallback(() => {
    if (state.selected) {
      handleSetStateField('open', false);
      setTargetGender(state.selected)
    }
  }, [state])

  return (
    <Dialog open={state.open} >
      <DialogContent className="sm:max-w-[425px] modal-story-preference">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Bạn thích theo dõi loại truyện nào?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              className={`w-40 h-40 flex flex-col items-center justify-center space-y-2 border-2 ${state.selected === 'male' ? 'border-red-500 bg-red-50' : 'border-red-200 hover:border-red-500 hover:bg-red-50'
                }`}
              onClick={() => handleSelect(Genders.MALE)}
            >
              <Image
                src="/svg/icon-for-male.svg" // Path to your SVG in the public folder
                alt="Users Icon"
                width={52}
                height={52}
              />
              <span>Dành cho Nam</span>
            </Button>
            <Button
              variant="outline"
              className={`w-40 h-40 flex flex-col items-center justify-center space-y-2 border-2 ${state.selected === 'female' ? 'border-red-500 bg-red-50' : 'border-red-200 hover:border-red-500 hover:bg-red-50'
                }`}
              onClick={() => handleSelect(Genders.FEMALE)}
            >
              <Image
                src="/svg/icon-for-female.svg" // Path to your SVG in the public folder
                alt="Users Icon"
                width={52}
                height={52}
              />
              <span>Dành cho Nữ</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!state.selected}
            onClick={handleSubmit}
          >
            Đồng ý
          </Button>
        </CardFooter>
      </DialogContent>
    </Dialog>
  );
}