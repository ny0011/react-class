import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinToday } from "../api";

const Container = styled.div`
  display: grid;
  grid-template:
    "a a"
    "a a";
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.theme.textColor};
  border-radius: 20% / 50%;
  padding: 10px;
  margin: 20px;
  & span:nth-child(2){
    margin-top: 10px;
    font-weight: bold;
  }
`;

interface PriceProps {
  coinId: string;
}

interface ITodayPrice {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<ITodayPrice[]>(["today", coinId], () =>
    fetchCoinToday(coinId)
  );
  const todayObjData = data ? data[0] : undefined;

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <Container>
            <List>
              <span>🎬open</span>
              <span>${todayObjData?.open.toFixed(2)}</span>
            </List>
            <List>
              <span>🍻close</span>
              <span>${todayObjData?.close.toFixed(2)}</span>
            </List>
            <List>
              <span>😱low</span>
              <span>${todayObjData?.low.toFixed(2)}</span>
            </List>
            <List>
              <span>🤑high</span>
              <span>${todayObjData?.high.toFixed(2)}</span>
            </List>
          </Container>
        </>
      )}
    </div>
  );
}

export default Price;
