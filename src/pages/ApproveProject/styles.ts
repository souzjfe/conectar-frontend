import styled from 'styled-components'
import { BodyCard as LinksCard } from '../../components/LinksCard/styles'
import { BodyCard as ProfileCard } from '../../components/ProfileCard/styles'
export const BodyApproveProject = styled.div`
  width: var(--container);
  padding: 1rem 0;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  grid-column-gap: 0.6rem;
  position: relative;

  > ${ProfileCard} {
    grid-column: 1;
  }
  > ${LinksCard} {
    grid-column: 3;
  }
  > main {
    grid-column: 2;
    padding: 1.2rem 0;
    border-radius: var(--borderRadius);
    background: white;
    border: solid 1px var(--borderDivision);
    height: fit-content;
    > section {
      & + section {
        border-top: solid 1px var(--borderDivision);
        padding: 1.2rem;
      }
    }
  }
`
