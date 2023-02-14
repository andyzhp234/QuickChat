import React from "react";
import { useSelector } from "react-redux";
import NewGroupModal from "./NewGroupModal";
import JoinGroupModal from "./JoinGroupModal";
import AddFriendsOrGroupsButton from "../../../../components/Buttons/AddFriendsOrGroupsButton";
import GroupListItem from "./GroupListItem";

export default function GroupList() {
  const [openCreateGroupModal, setOpenCreateGroupModal] = React.useState(false);
  const [openJoinGroupModal, setJoinGroupModal] = React.useState(false);

  const groupsList = useSelector((state) => state.groups.groups);

  return (
    <div className="antiscroll-inner mt-2 mb-2 flex h-full w-full flex-col items-center overflow-y-auto">
      {openCreateGroupModal ? (
        <NewGroupModal setModal={setOpenCreateGroupModal} />
      ) : null}
      {openJoinGroupModal ? (
        <JoinGroupModal setModal={setJoinGroupModal} />
      ) : null}
      <AddFriendsOrGroupsButton
        text={"Create Groups"}
        onClick={() => setOpenCreateGroupModal((prev) => !prev)}
      />
      <AddFriendsOrGroupsButton
        text={"Join a Group"}
        join={true}
        onClick={() => setJoinGroupModal((prev) => !prev)}
      />
      {groupsList.map((group) => (
        <GroupListItem
          key={group.id}
          conversationId={group.id}
          name={group.name}
        />
      ))}
    </div>
  );
}
