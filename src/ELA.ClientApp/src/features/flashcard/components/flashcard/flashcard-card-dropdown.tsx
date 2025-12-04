import {
  MoreVerticalIcon,
  SquarePenIcon,
  Trash2Icon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type FlashcardCardDropdownProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export const FlashcardCardDropdown: React.FC<FlashcardCardDropdownProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          aria-label='Open menu'
          size='icon-sm'
          className='absolute -right-2 -top-2 p-0 opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 group-hover:pointer-events-auto'
        >
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={onEdit}>
            <SquarePenIcon />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={onDelete}>
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
