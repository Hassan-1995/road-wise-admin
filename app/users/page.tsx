import Link from "next/link";
import Users from "./components/Users";

const UsersPage = async () => {
  return (
    <div className="p-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-lg font-bold mb-4">Users</h1>
        <Link
          href={"/users/add-sub-admin"}
          className="text-blue-900 font-semibold rounded-xl hover:underline underline-offset-[5px] mr-10"
        >
          {" "}
          Add User
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto py-2 mb-3">
        <Users />
      </div>
    </div>
  );
};

export default UsersPage;
