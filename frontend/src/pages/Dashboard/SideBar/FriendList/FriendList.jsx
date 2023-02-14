import React from "react";
import { useSelector } from "react-redux";
import FriendListItem from "./FriendListItem";
import NewFriendModal from "./NewFriendModal";
import AddFriendsOrGroupsButton from "../../../../components/Buttons/AddFriendsOrGroupsButton";

export default function FriendList() {
  const [isOpenAddFriendModal, setIsOpenAddFriendModal] = React.useState(false);
  const onlineFriendsList = useSelector(
    (state) => state.friendsLists.onlineFriends
  );
  const offlineFriendsList = useSelector(
    (state) => state.friendsLists.offlineFriends
  );
  return (
    <div className="antiscroll-inner mt-2 mb-2 flex h-full w-full flex-col items-center overflow-y-auto">
      {isOpenAddFriendModal ? (
        <NewFriendModal setModal={setIsOpenAddFriendModal} />
      ) : null}
      <AddFriendsOrGroupsButton
        text={"Add Friends"}
        onClick={() => setIsOpenAddFriendModal(!isOpenAddFriendModal)}
      />
      {onlineFriendsList?.map((friend) =>
        friend?.id ? (
          <FriendListItem
            key={friend.id}
            id={friend.id}
            conversationId={friend.conversationId}
            username={friend.username}
            isOnline={true}
          />
        ) : null
      )}
      {offlineFriendsList?.map((friend) =>
        friend?.id ? (
          <FriendListItem
            key={friend.id}
            id={friend.id}
            conversationId={friend.conversationId}
            username={friend.username}
            isOnline={false}
          />
        ) : null
      )}
    </div>
  );
}
