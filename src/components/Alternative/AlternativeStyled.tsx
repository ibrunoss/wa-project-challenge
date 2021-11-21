import styled from "@emotion/styled";

interface AlternativeStyledContentProps {
  clicked?: boolean;
}

export const AlternativeStyledContent: React.FC<AlternativeStyledContentProps> = styled.div<AlternativeStyledContentProps>`
  position: relative;
  display: flex;
  flex: 1;
  font-weight: 700;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  ${({ clicked }) => (clicked ? "transform: rotateY(180deg);" : "")}
`;

export const AlternativeStyledLabel = styled("div")`
  display: flex;
  margin-right: 20px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  color: #667adb;
  font-size: 1.5rem;
`;

export const AlternativeStyledFront = styled("div")`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  align-items: center;
  background: #1976d2;
  color: #ffffff;
  border-radius: 4px;
  padding: 15px;

  :hover {
    background: #1565c0;
  }
`;

interface AlternativeStyledContentProps {
  isRight?: boolean;
}

export const AlternativeStyledBack = styled.div<AlternativeStyledContentProps>`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  background: #${({ isRight }) => (isRight ? "2baa6d" : "e44a4c")};
  color: #ffffff;
  border-radius: 4px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: rotateY(180deg);

  & > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
  }
`;
