import { useUser } from "../contexts/UseUser";

const Profile = () => {
  const { user } = useUser();
  return (
    <div className="py-2 px-4">
      {user && (
        <div className="flex flex-col justify-center gap-2 items-start w-full">
          <strong>{user.firstName}</strong>
          <strong> {user.lastName}</strong>
        </div>
      )}
    </div>
  );
};

export default Profile;
