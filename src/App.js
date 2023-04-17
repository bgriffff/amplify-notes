import {
  UpdateNote,
  CreateNote,
  NavBar,
  NoteUICollection,
} from "./ui-components";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import { DataStore } from "aws-amplify";

function App({ signOut }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateNote, setUpdateNote] = useState();

  return (
    <>
      <NavBar
        width="100%"
        marginBottom="20px"
        overrides={{
          Button31632483: { onClick: () => setShowCreateModal(true) },
          Button31632487: {
            onClick: async () => {
              signOut();
              //clears users data when they sign out
              await DataStore.clear();
            },
          },
        }}
      />
      <div className="container">
        <NoteUICollection
          overrideItems={({ item, idx }) => {
            return {
              overrides: {
                Vector31472745: {
                  as: "button",
                  onClick: () => {
                    setShowUpdateModal(true);
                    setUpdateNote(item);
                  },
                },
              },
            };
          }}
        />
      </div>
      <div
        className="modal"
        style={{ display: showCreateModal === false && "none" }}
      >
        <CreateNote
          overrides={{
            MyIcon: {
              as: "button",
              onClick: () => setShowCreateModal(false),
            },
          }}
        />
      </div>
      <div
        className="modal"
        style={{ display: showUpdateModal === false && "none" }}
      >
        <UpdateNote
          note={updateNote}
          overrides={{
            MyIcon: {
              as: "button",
              onClick: () => setShowUpdateModal(false),
            },
          }}
        />
      </div>
    </>
  );
}

export default withAuthenticator(App);
