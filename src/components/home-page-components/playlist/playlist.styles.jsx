import styled from "styled-components";
import Button from "../../reusable-components/button/button.component";

export const PlaylistContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    width: 30%;
    max-height: 950px;
    padding: 0.88rem 1.16rem;

    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: 0 4px 2px 2px #000000;

    input {
        width: 100%;
        border: 0;
        outline: 0;
        text-align: center;
        padding: 0;
        height: 1.7rem;
        background: transparent;
        font-family: 'Poppins', sans-serif;
        font-size: 1.55rem;
        color: #fff;
      }
`

export const SaveToSpotifyButton = styled(Button)`
      margin-top: 1rem;
`