"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Category } from "@/types";

interface IState {
  sortActiveButton: string;
  chapterActiveButton: string;
  statusActiveButton: string;
}

interface ButtonOption {
  label: string;
  value: string;
}

const sortButtonOptions: ButtonOption[] = [
  { label: "Mới cập nhật", value: "moi-cap-nhat" },
  { label: "Truyện mới", value: "truyen-moi" },
  { label: "Số chương", value: "so-chuong" },
];
const chapterButtonOptions: ButtonOption[] = [
  { label: "Tất cả", value: "all" },
  { label: "<300", value: "<300" },
  { label: "300-1000", value: "300-1000" },
  { label: "1000-2000", value: "1000-2000" },
  { label: ">2000", value: ">2000" },
];
const statusButtonOptions: ButtonOption[] = [
  { label: "Đang tiến hành", value: "progress" },
  { label: "Hoàn thành", value: "complete" },
  { label: "Tạm ngưng", value: "pause" },
];
// categories;
interface IBookFilter {
  categories: Category[];
  selectedCategories: number[];
  handleCheckboxChange: (category: number) => void;
}
const BookFilter: React.FC<IBookFilter> = ({
  categories,
  selectedCategories,
  handleCheckboxChange,
}) => {
  const [state, setState] = useState<IState>({
    sortActiveButton: "moi-cap-nhat",
    chapterActiveButton: "all",
    statusActiveButton: "progress",
  });
  const handleSetStateField = useCallback(
    (field: keyof IState, value: boolean | string) => {
      setState((prevState) => ({ ...prevState, [field]: value }));
    },
    []
  );
  return (
    <div className='bg-transparent p-4 text-white'>
      <div className='grid grid-cols-1 items-start gap-4 md:grid-cols-[150px,1fr]'>
        <h3 className='text-sky-300'>Thể loại</h3>
        <div className='flex flex-wrap gap-2'>
          {categories.map((item) => (
            <div key={item.id} className='flex items-center space-x-2'>
              <Checkbox
                id={item.id.toString()}
                checked={selectedCategories.includes(item.id)}
                className='h-6 w-6 rounded-none border-gray-300 border-white data-[state=checked]:border-none data-[state=checked]:bg-custom-red'
                onCheckedChange={() => handleCheckboxChange(item.id)}
              />
              <Label
                htmlFor={item.id.toString()}
                className={`${
                  selectedCategories.includes(item.id)
                    ? "text-custom-red"
                    : "text-gray-600"
                }`}
              >
                {item.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-4 grid grid-cols-1 items-center gap-4 md:grid-cols-[150px,1fr]'>
        <h3 className='text-sky-300'>Sắp xếp</h3>
        <div defaultValue='moi-cap-nhat' className='flex flex-wrap gap-2'>
          {sortButtonOptions.map((option) => (
            <div key={option.value} className='flex items-center space-x-2'>
              <Button
                onClick={() =>
                  handleSetStateField("sortActiveButton", option.value)
                }
                variant='default'
                className={cn(
                  "rounded-none border-gray-300 bg-transparent px-2 py-1 text-sm",
                  state.sortActiveButton === option.value
                    ? "border border-custom-red text-custom-red hover:bg-custom-red hover:text-white"
                    : "text-gray-500 hover:bg-custom-red hover:text-white"
                )}
              >
                {option.label}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-4 grid grid-cols-1 items-center gap-4 md:grid-cols-[150px,1fr]'>
        <h3 className='text-sky-300'>Lọc theo chương</h3>
        <div className='flex flex-wrap gap-2'>
          {chapterButtonOptions.map((option) => (
            <div key={option.value} className='flex items-center space-x-2'>
              <Button
                onClick={() =>
                  handleSetStateField("chapterActiveButton", option.value)
                }
                variant='default'
                className={cn(
                  "rounded-none border-gray-300 bg-transparent px-2 py-1 text-sm",
                  state.chapterActiveButton === option.value
                    ? "border border-custom-red text-custom-red hover:bg-custom-red hover:text-white"
                    : "text-gray-500 hover:bg-custom-red hover:text-white"
                )}
              >
                {option.label}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-4 grid grid-cols-1 items-center gap-4 md:grid-cols-[150px,1fr]'>
        <h3 className='text-sky-300'>Tình trạng</h3>
        <div className='flex flex-wrap gap-2'>
          {statusButtonOptions.map((option) => (
            <div key={option.value} className='flex items-center space-x-2'>
              <Button
                onClick={() =>
                  handleSetStateField("statusActiveButton", option.value)
                }
                variant='default'
                className={cn(
                  "rounded-none border-gray-300 bg-transparent px-2 py-1 text-sm",
                  state.statusActiveButton === option.value
                    ? "border border-custom-red text-custom-red hover:bg-custom-red hover:text-white"
                    : "text-gray-500 hover:bg-custom-red hover:text-white"
                )}
              >
                {option.label}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookFilter;
