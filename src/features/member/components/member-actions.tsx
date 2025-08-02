import { MoreHorizontal, Edit, Power, Zap } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MemberDialog } from "./member-dialog";
import type { TMember } from "../types/member.type";
import type {
  CreateMemberFormData,
  UpdateMemberFormData,
} from "../schemas/member.schema";

interface MemberActionsProps {
  member: TMember;
  onUpdateMember: (
    data: CreateMemberFormData | UpdateMemberFormData
  ) => Promise<void>;
  onToggleActive: (id: string) => Promise<void>;
  onToggleAutoGen: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function MemberActions({
  member,
  onUpdateMember,
  onToggleActive,
  onToggleAutoGen,
  isLoading = false,
}: MemberActionsProps) {
  const handleToggleActive = async () => {
    await onToggleActive(member.id);
  };

  const handleToggleAutoGen = async () => {
    await onToggleAutoGen(member.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={isLoading}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <MemberDialog
          mode="edit"
          member={member}
          onSubmit={onUpdateMember}
          isLoading={isLoading}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          }
        />
        <DropdownMenuItem onClick={handleToggleActive}>
          <Power className="mr-2 h-4 w-4" />
          {member.is_active ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleToggleAutoGen}>
          <Zap className="mr-2 h-4 w-4" />
          {member.is_auto_gen ? "Disable Auto Gen" : "Enable Auto Gen"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
