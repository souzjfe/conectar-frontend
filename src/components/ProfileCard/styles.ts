import styled from 'styled-components'

export const BodyCard = styled.div`
  border-radius: var(--borderRadius);
  background: white;
  padding-top: 2rem;
  width: 100%;
  height: fit-content;
  border: solid 1px var(--borderDivision);
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: space-evenly;
  > img {
    border-radius: 50%;
    width: 40%;
    object-fit: cover;
    object-position: center;
  }
  > p {
    text-align: center;
    color: var(--gray);
  }
  > aside {
    display: flex;
    gap: 1rem;
    > img {
      width: 2rem;
    }
  }
  > button {
    width: 100%;
    border: 0;
    background: white;
    align-self: flex-end;
    padding: 0.6rem;
    border-top: solid 1px var(--borderDivision);
    font-weight: 700;
    border-radius: 0 0 0.8rem 0.8rem;
  }
`