"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { SearchIcon } from "lucide-react";
import { Genders, useCategoryStore, useHomeStore } from "@/lib";
import { useCallback, useEffect, useState } from "react";
import { SheetMenu } from "../layout/sheet-menu";
import { createAxiosInstance } from "@/utils/axiosInstance";
import { Category, GetCategoryResponse } from "@/types";

interface IState {
  imageMaleSrc: string;
  imageFemaleSrc: string;
  isMounted: boolean;
}
export default function Header() {
  const axiosInstance = createAxiosInstance();
  const { targetGender, setTargetGender } = useHomeStore();
  const { setCategory, categories } = useCategoryStore();
  const getCategory = useCallback(async () => {
    try {
      const response =
        await axiosInstance.get<GetCategoryResponse<Category[]>>(
          "/api/category"
        );
      const { data } = response;
      if (data?.message === "Success") {
        console.log('hihi');
        
        setCategory(data.data);
      }
    } catch (err: any) {}
  }, []);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      getCategory();
    }
  }, [getCategory]);

  const [state, setState] = useState<IState>({
    imageMaleSrc: "/svg/icon-shield-active.svg",
    imageFemaleSrc: "/svg/icon-users.svg",
    isMounted: false,
  });

  const handleSetStateField = useCallback(
    (field: keyof IState, value: boolean | string) => {
      setState((prevState) => ({ ...prevState, [field]: value }));
    },
    []
  );

  useEffect(() => {
    handleSetStateField("isMounted", true);
  }, []);
  useEffect(() => {
    // Cập nhật imageSrc sau khi component đã mount trên client
    if (targetGender === Genders.MALE) {
      handleSetStateField("imageMaleSrc", "/svg/icon-shield-active.svg");
      handleSetStateField("imageFemaleSrc", "/svg/icon-users.svg");
    } else {
      handleSetStateField("imageMaleSrc", "/svg/icon-shield.svg");
      handleSetStateField("imageFemaleSrc", "/svg/icon-users-active.svg");
    }
  }, [handleSetStateField, targetGender]);

  return (
    <header className='relative h-[300px] w-full overflow-hidden'>
      <nav className='flex items-center justify-between px-8 py-2 absolute'>
        <div className={`${cn("block lg:!hidden")} z-50`}>
          {/* <MobileSidebar /> */}
          <SheetMenu />
        </div>
      </nav>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: `url("/images/bg-header.png")`,
        }}
      />
      <div className='relative z-10 flex h-full flex-col items-center justify-center px-8'>
        <div className='mb-8'>
          <div className='flex items-center justify-center '>
            <Image
              className='h-24 w-24 items-center justify-center'
              src='/images/logo.png' // Relative path from the public folder
              alt='Mystical landscape with pagodas on misty mountains'
              width={96} // Equivalent to w-24 (24 * 4 = 96px)
              height={96} // Equivalent to h-24 (24 * 4 = 96px)
            />
          </div>
        </div>
        <div className='mb-4 w-full max-w-md'>
          <div className='relative'>
            <Input
              type='text'
              placeholder='Nhập tên truyện hoặc tác giả'
              className={`pr-10 ${
                state.isMounted
                  ? targetGender === Genders.MALE
                    ? "border-male-blue"
                    : "border-female-purple"
                  : ""
              }`}
            />
            <Button
              size='icon'
              variant='ghost'
              className={`absolute right-0 top-0 h-full ${
                state.isMounted
                  ? targetGender === Genders.MALE
                    ? "hover:bg-male-blue bg-male-blue"
                    : "hover:bg-female-purple bg-female-purple"
                  : ""
              }`}
            >
              <SearchIcon className='h-4 w-4 text-white ' />
            </Button>
          </div>
        </div>
        <div className='flex space-x-2'>
          <Button
            variant='secondary'
            size='icon'
            className='w-13 h-13'
            onClick={() => setTargetGender(Genders.MALE)}
          >
            <Image
              src={state.imageMaleSrc}
              alt='Users Icon'
              width={52}
              height={52}
            />
          </Button>
          <Button
            variant='secondary'
            size='icon'
            className='w-13 h-13'
            onClick={() => setTargetGender(Genders.FEMALE)}
          >
            <Image
              src={state.imageFemaleSrc}
              alt='Users Icon'
              width={52}
              height={52}
            />
          </Button>
        </div>
      </div>
    </header>
  );
}
