import { getSubAdminBySubAdminID } from "@/app/apiFolder/admin";
import React from "react";
import UpdateSubAdminForm from "./UpdateSubAdmin";

type Props = {
  params: Promise<{ sub_admin_id: string }>;
};

const UpdateSubAdminPage = async ({ params }: Props) => {
  const { sub_admin_id } = await params; // ✅ unwrap params
  const subAdmin = await getSubAdminBySubAdminID(Number(sub_admin_id));
  console.log("SubAdmin: ", subAdmin);
  return (
    <div className="min-h-screen bg-gradient-subtle pb-12 pt-4 px-4">
      <div className="max-w-2xl">
        <h1 className="text-lg font-bold mb-4">Update User</h1>
        <UpdateSubAdminForm subAdmin={subAdmin} />
      </div>
    </div>
  );
};

export default UpdateSubAdminPage;
