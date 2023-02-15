import * as React from "react";
import FormModal from "./FormModal";
import MainModal from "./MainModal";

export default function Modal({ place, setOpen }) {
  const [openModalRating, setOpenModalRating] = React.useState(false);

  return (
    <>
      {!openModalRating ? (
        <MainModal
          place={place}
          openModalRating={openModalRating}
          setOpenModalRating={setOpenModalRating}
          setOpen={setOpen}
        />
      ) : (
        <FormModal place={place} setOpen={setOpen} />
      )}
    </>
  );
}
