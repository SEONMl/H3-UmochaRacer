import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import SelectFlow from './SelectFlow';
import GuideEstimate from './GuideEstimate';
import EstimateContent from '../content/totalestimate/EstimateContent';
import Content from '../content/Content';
import {useGuideFlowState} from '@/provider/guideFlowProvider';
import {fetchData} from '@/api/fetchData';
import {SelectedOptionContext, Option} from '@/provider/selectedOptionProvider';

interface Url {
  [key: string]: string;
}

interface GuideData {
  id: number;
  imageSrc: string;
  name: string;
  price: number;
}

const urlEndPoint: Url = {
  powertrain: 'powertrain',
  drivingSystem: 'driving-system',
  bodytype: 'bodytype',
  exteriorColor: 'exterior-color',
  interiorColor: 'interior-color',
  wheel: 'wheel',
  additionalOption: 'additional-option',
};

const keyMapping: Record<number, string> = {
  0: '파워트레인',
  1: '구동 방식',
  2: '바디 타입',
  3: '외장 색상',
  4: '내장 색상',
  5: '휠',
};

const categoryMapping: Record<number, string> = {
  0: 'car',
  1: 'car',
  2: 'car',
  3: 'color',
  4: 'color',
  5: 'car',
};

const getGiudeOption = async (giudeData: GuideData | null) => {
  if (!giudeData) return [];
  return Promise.all(
    Object.entries(giudeData).map(async ([key, value]) => {
      const category = key.slice(0, -2);

      if (Array.isArray(value)) {
        return Promise.all(
          value.map((id) => fetchData(`/info/${urlEndPoint[category]}/${id}`)),
        );
      }
      return fetchData(`/info/${urlEndPoint[category]}/${value}`);
    }),
  );
};
const setGiudeOption = (
  dataArray: GuideData[],
  addOption: (option: Option) => void,
) => {
  let newOption: Option;
  dataArray.forEach((elem, index) => {
    newOption = {
      key: keyMapping[index],
      value: elem.name,
      category: categoryMapping[index],
      price: elem.price,
      id: elem.id,
      imgSrc: elem.imageSrc,
    };

    addOption(newOption);
  });
};

function GuideContent() {
  const [complete, setComplete] = useState(false);
  const {dataObject} = useGuideFlowState();
  const {addOption} = useContext(SelectedOptionContext);

  const getGuideData = async () => {
    if (dataObject.options) {
      const requestBody = {
        age: dataObject.age,
        gender: dataObject.gender,
        tag1: dataObject.options[0],
        tag2: dataObject.options[1],
        tag3: dataObject.options[2],
      };

      const guideId = await fetch('http://43.202.84.133:9999/api/v1/guide', {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((res) => res.data);

      const guideDataArr: GuideData[] = await getGiudeOption(guideId);
      setGiudeOption(guideDataArr, addOption);
    }
  };

  useEffect(() => {
    if (complete) {
      getGuideData();
    }
  }, [complete]);

  return (
    <Wrapper>
      <Container>
        {complete ? (
          <GuideEstimate />
        ) : (
          <SelectFlow setComplete={setComplete} />
        )}
      </Container>
    </Wrapper>
  );
}

export default GuideContent;

const Wrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  // padding-top: 111px;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;
  height: 100%;
  margin: auto;
`;
