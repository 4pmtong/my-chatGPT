import { IconCheck, IconTemperature, IconX } from "@tabler/icons-react";
import { FC, KeyboardEvent, useState } from "react";
import { SidebarButton } from "./SidebarButton";

interface Props {
  temperature: number;
  onTemperatureChange: (temperature: number) => void;
}

export const Temperature: FC<Props> = ({ temperature, onTemperatureChange }) => {
  const [isChanging, setIsChanging] = useState(false);
  const [newTemperature, setNewTemperature] = useState(temperature);

  const handleEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdateTemperature(newTemperature);
    }
  };

  const handleUpdateTemperature = (newTemperature: number) => {
    onTemperatureChange(newTemperature);
    setIsChanging(false);
  };

  return isChanging ? (
    <div className="flex transition-colors duration:200 hover:bg-gray-500/10 py-3 px-3 rounded-md cursor-pointer w-full items-center">
      <IconTemperature size={16} />

      <input
        className="ml-2 flex-1 h-[20px] bg-transparent border-b border-neutral-400 focus:border-neutral-100 text-left overflow-hidden overflow-ellipsis pr-1 outline-none text-white"
        type="number"
        value={newTemperature}
        max={2}
        min={0}
        onChange={(e) => {
          if (parseFloat(e.target.value) > 2) {
            setNewTemperature(2)
          } else if (parseFloat(e.target.value) < 0) {
            setNewTemperature(0)
          } else {
            setNewTemperature(parseFloat(e.target.value))
          }
        }}
        onKeyDown={handleEnterDown}
      />

      <div className="flex w-[40px]">
        <IconCheck
          className="ml-auto min-w-[20px] text-neutral-400 hover:text-neutral-100"
          size={18}
          onClick={(e) => {
            e.stopPropagation();
            handleUpdateTemperature(newTemperature);
          }}
        />

        <IconX
          className="ml-auto min-w-[20px] text-neutral-400 hover:text-neutral-100"
          size={18}
          onClick={(e) => {
            e.stopPropagation();
            setIsChanging(false);
            setNewTemperature(temperature);
          }}
        />
      </div>
    </div>
  ) : (
    <SidebarButton
      text={`Chat Temperature[${temperature}]`}
      icon={<IconTemperature size={16} />}
      onClick={() => setIsChanging(true)}
    />
  );
};
