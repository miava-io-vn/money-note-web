import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MemberForm } from "./member-form";
import type { TMember } from "../types/member.type";
import type {
  CreateMemberFormData,
  UpdateMemberFormData,
} from "../schemas/member.schema";

interface MemberDialogProps {
  mode: "create" | "edit";
  member?: TMember;
  onSubmit: (
    data: CreateMemberFormData | UpdateMemberFormData
  ) => Promise<void>;
  trigger?: React.ReactNode;
  isLoading?: boolean;
}

export function MemberDialog({
  mode,
  member,
  onSubmit,
  trigger,
  isLoading = false,
}: MemberDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (
    data: CreateMemberFormData | UpdateMemberFormData
  ) => {
    if (mode === "edit" && member) {
      await onSubmit({ ...data, id: member.id } as UpdateMemberFormData);
    } else {
      await onSubmit(data as CreateMemberFormData);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const defaultTrigger = (
    <Button variant={mode === "create" ? "default" : "outline"} size="sm">
      {mode === "create" ? "Add Member" : "Edit"}
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Member" : "Edit Member"}
          </DialogTitle>
        </DialogHeader>
        <MemberForm
          mode={mode}
          member={member}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
