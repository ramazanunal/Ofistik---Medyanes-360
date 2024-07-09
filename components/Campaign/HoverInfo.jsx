import { CalendarIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { IoMdInformationCircleOutline } from "react-icons/io";

export function HoverInfo({
  icon = CalendarIcon,
  title = "title",
  description = "description",
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="p-0">
          <IoMdInformationCircleOutline className="size-6 md:size-5 fill-premiumOrange" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4 text-premiumOrangeBg opacity-90">
          <div className="space-y-2.5 w-80">
            <h4 className="text-sm font-bold flex items-center gap-2">
              <CalendarIcon />
              {title}
            </h4>
            <p className="text-sm first-letter:ml-1 break-words w-full ">{description}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
