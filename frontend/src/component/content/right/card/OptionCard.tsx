import React from 'react';
import {useState, useRef, useCallback} from 'react';
import styled from 'styled-components';
import {colors} from '@/style/theme';
import DetailToggle from './DetailToggle';
import {Body2_Regular, Popup_Regular, Title2_Medium} from '@/style/fonts';

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM10.643 16.243L17.713 9.172L16.299 7.758L10.643 13.415L7.814 10.586L6.4 12L10.643 16.243Z"
        fill="#0E2B5C"
      />
    </svg>
  );
};

function OptionCard() {
  const [toggle, setToggle] = useState(false); // 클릭 여부 상태 관리
  const contentBoxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const clickedToggle = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (contentBoxRef.current === null || contentRef.current === null) {
        return;
      }

      if (contentBoxRef.current.clientHeight > 0) {
        contentBoxRef.current.style.height = '0';
      } else {
        contentBoxRef.current.style.height = `${contentRef.current.clientHeight}px`;
      }

      setToggle(!toggle);
    },
    [toggle],
  );

  return (
    <Wrapper>
      {Icon()}
      <Text1>구매자의 63%가 선택했어요!</Text1>
      <Text2>디젤 2.2</Text2>
      <DetailBox ref={contentBoxRef} toggle={toggle}>
        <DetailContent ref={contentRef}>
          컨텐츠
          <Text1>구매자의 63%가 선택했어요!</Text1>
          <Text2>디젤 2.2</Text2>
          <Text1>구매자의 63%가 선택했어요!</Text1>
          <Text2>디젤 2.2</Text2>
        </DetailContent>
      </DetailBox>
      <Footer>
        <Price>+ 1,480,000원</Price>
        <DetailToggle onClick={clickedToggle} isOpen={toggle}></DetailToggle>
      </Footer>
    </Wrapper>
  );
}

export default OptionCard;

const Wrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  width: 375px;
  min-height: 150px;
  padding: 20px;
  border-radius: 6px;
  border: 2px solid ${colors.Main_Hyundai_Blue};
`;

const Text1 = styled.div`
  ${Popup_Regular}
  font-size: 12px;
  line-height: 130%;
  margin-top: 10px;
  height: 16px;
  color: ${colors.Main_Hyundai_Blue};
`;

const Text2 = styled.div`
  ${Title2_Medium}
  margin-top: 4px;
  height: 26px;
  color: ${colors.Cool_Grey};
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 18px;
  margin-top: 13px;
`;

const Price = styled.div`
  ${Body2_Regular}
  color: ${colors.Main_Hyundai_Blue};
`;

const DetailBox = styled.div<{toggle: boolean}>`
  position: relative;
  height: 0;
  pointer-events: ${(props) => (props.toggle ? '' : 'none')};
  overflow: hidden;
  transition: height 0.5s;
`;

const DetailContent = styled.div`
  position: absolute;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid ${colors.Cool_Grey_001};
`;
