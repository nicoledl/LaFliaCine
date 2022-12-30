import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import styled from "@emotion/styled";

const Buttons = styled.div`
position:absolute,
float: right,
`
const ButtonsSide = () => {



    return (
        <>
        <Buttons>
        <FiberManualRecordIcon> </FiberManualRecordIcon>
        </Buttons>
        </>
    )
}

export default ButtonsSide;