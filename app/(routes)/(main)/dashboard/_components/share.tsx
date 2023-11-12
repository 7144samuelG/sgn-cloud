import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Share2 } from "lucide-react";
import {
    EmailIcon,
  EmailShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
const FileShare = ({file}:{file:string}) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <p>share</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>share</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="flex space-x-2 items-center justify-end">
            <DropdownMenuItem>
              <WhatsappShareButton url={file}>
                <WhatsappIcon size={20} round={true} />
              </WhatsappShareButton>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <EmailShareButton url={file}>
                <EmailIcon size={20} round={true} />
              </EmailShareButton>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default FileShare;
