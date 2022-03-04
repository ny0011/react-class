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
  display: grid;
  grid-template-columns: repeat(1, 3.5em 1fr 3.5em);
  font-weight: bold;
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 1.4em;
  border: none;
  border-radius: 1em;
  background-color: ${(props) => props.theme.cardBgColor};
`;
const Button = styled.div`
  position: absolute;
  border: none;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  background-color: ${(props) => props.theme.accentColor};
  margin: 0;
  z-index: 1;
  transition: transform 200ms linear;
  left: 0em;
`;

const Input = styled.input`
  position: absolute;
  left: 0em;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  width: 90%;
  height: 1em;
  z-index: 2;
  &:checked + ${Button} {
    transform: translateX(2em);
  }
`;
const Emoji = styled.div`
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1em;
  position: relative;
`;

const DarkEmoji = styled.div`
  width: 30%;
  position: absolute;
  right: 1.4em;
`;
const LightEmoji = styled.div`
  width: 30%;
  position: absolute;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
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
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <HeaderContainer></HeaderContainer>
        <HeaderContainer>
          <Title>코인</Title>
        </HeaderContainer>
        <HeaderContainer>
          <ButtonContainer>
            <Emoji>
              <LightEmoji>🌞</LightEmoji>
            </Emoji>

            <Input type="checkbox" onClick={toggleDarkAtom}></Input>
            <Button></Button>
            <Emoji>
              <DarkEmoji>🌚</DarkEmoji>
            </Emoji>
          </ButtonContainer>
        </HeaderContainer>
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
