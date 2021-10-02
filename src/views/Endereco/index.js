import P from "prop-types";
import React, { useState } from "react";
import { Modal, Box, Typography } from "@material-ui/core";
// import axios from "axios";

import "./style.css";

export const Endereco = ({ data }) => {
  const [modal, setModal] = useState(false);

  return (
    <div className="modal" onClick={() => setModal(!modal)}>
      <h6>{data.endereco_id}</h6>
      <Modal
        open={modal}
        onClose={setModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="area-modal"
      >
        <Box className="box-modal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {data.nome}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

Endereco.propTypes = {
  data: P.object.isRequired,
};
