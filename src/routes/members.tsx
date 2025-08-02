import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { allMembersQueryOption } from "@/features/member/queries/options";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  useCreateMember,
  useUpdateMember,
  useToggleActive,
  useToggleAutoGen,
} from "@/features/member/mutations";
import { MemberDialog } from "@/features/member/components/member-dialog";
import { MemberActions } from "@/features/member/components/member-actions";
import type {
  CreateMemberFormData,
  UpdateMemberFormData,
} from "@/features/member/schemas/member.schema";

export const Route = createFileRoute("/members")({
  component: MembersPage,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(allMembersQueryOption);
  },
});

function MembersPage() {
  const { data: members } = useSuspenseQuery(allMembersQueryOption);
  const createMemberMutation = useCreateMember();
  const updateMemberMutation = useUpdateMember();
  const toggleActiveMutation = useToggleActive();
  const toggleAutoGenMutation = useToggleAutoGen();

  const handleCreateMember = async (data: CreateMemberFormData) => {
    await createMemberMutation.mutateAsync(data);
  };

  const handleUpdateMember = async (
    data: CreateMemberFormData | UpdateMemberFormData
  ) => {
    if ("id" in data) {
      await updateMemberMutation.mutateAsync({
        id: data.id,
        data: { name: data.name },
      });
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      await toggleActiveMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error toggling active status:", error);
    }
  };

  const handleToggleAutoGen = async (id: string) => {
    try {
      await toggleAutoGenMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error toggling auto gen status:", error);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Members</h1>
        <MemberDialog
          mode="create"
          onSubmit={handleCreateMember}
          trigger={<Button>Add Member</Button>}
          isLoading={createMemberMutation.isPending}
        />
      </div>

      <div className="grid gap-4">
        {members.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <CardTitle>{member.name}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge
                        variant={member.is_active ? "default" : "secondary"}
                        className={
                          member.is_active
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }
                      >
                        {member.is_active ? "Active" : "Inactive"}
                      </Badge>
                      <Badge
                        variant={member.is_auto_gen ? "default" : "secondary"}
                        className={
                          member.is_auto_gen
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }
                      >
                        {member.is_auto_gen ? "Auto Gen" : "Manual"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <MemberActions
                  member={member}
                  onUpdateMember={handleUpdateMember}
                  onToggleActive={handleToggleActive}
                  onToggleAutoGen={handleToggleAutoGen}
                  isLoading={
                    updateMemberMutation.isPending ||
                    toggleActiveMutation.isPending ||
                    toggleAutoGenMutation.isPending
                  }
                />
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
