import React, { useState, useEffect } from 'react';
import { BodyExperienceAreas } from './styles';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import SelectArea from '../../components/SelecArea';


interface AreaTypes {
  name: string;
  subareas: string[];
}


function ExperienceAreas() {
  const history = useHistory();
  

  const [selectedAreas, setSelectedAreas] = useState<AreaTypes[]>([{
    name: "",
    subareas: [""]
  }]);


  useEffect(() => {

  }, [selectedAreas]);
  return (
    <BodyExperienceAreas  >
      <div className="area-central container">

        <h1>Selecione suas áreas de atuação (máx. 5)</h1>
        <SelectArea />


      </div>
      <footer >
        <Button>Pular</Button> <Button onClick={() => { history.push("/masterytools") }}>Continuar</Button>
      </footer>
    </BodyExperienceAreas >
  )
}
export default ExperienceAreas;