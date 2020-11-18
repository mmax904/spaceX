import React from 'react';
import { css } from "@emotion/core";
import ClockLoader from "react-spinners/ClockLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: 15%;
`;

const Loader = ({loading}) => {
    return (
        <ClockLoader
            css={override}
            size={150}
            color={"#123abc"}
            loading={loading}
        />
    )
};

export default Loader;
