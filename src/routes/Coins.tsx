import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  position: relative;
`;

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  right: 1rem;
  width: 60px;
  height: 30px;
  border: none;
  border-radius: 1em;
  padding: 2px 10px;
  background-color: ${(props) => props.theme.cardBgColor}; 
`
const Button = styled.button`
  position: absolute;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.theme.accentColor};
  margin: 0;
  z-index: 1;
  transition: transform 250ms linear;
  left: 0.1rem;
`

const Input = styled.input`
  position: absolute;
  left: 0rem;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  width: 75px;
  height: 30px;
  z-index: 2;
  &:checked + ${Button}{
    transform: translateX(3.5em);
  }
`

const DarkEmoji = styled.div`
  font-size: 1.5em;
  left: 0rem;
  width: 10px;
  height: 24px;
  position: absolute;
`
const LightEmoji = styled.div`
  font-size: 1.5em;
  width: 12px;
  height: 24px;
  right: 1.3rem;
  position: absolute;
`

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color:  ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  font-size: 20px;
  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
    padding: 20px;
    font-weight: bold;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}


function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const setDarkAtom = useSetRecoilState(isDarkAtom)
  const toggleDarkAtom = () => setDarkAtom(prev => !prev)

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>        
        <ButtonContainer  >
          <LightEmoji>🌞</LightEmoji>
          <Input type="checkbox" onClick={toggleDarkAtom} ></Input>
          <Button ></Button>
          <DarkEmoji>🌚</DarkEmoji>
        </ButtonContainer>
      </Header>
      {isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt="coin symbol"
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
