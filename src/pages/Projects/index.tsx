import React, { useState, ChangeEvent, FormEvent, useEffect, ReactNode, useContext, Fragment, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BodyProjects } from './styles';
import { BodyModalDefault } from '../../components/Modal/styles';
import edit from '../../assets/icon/editar.svg'
import trash from '../../assets/icon/lixeira.svg'
//import clone from '../../assets/icon/clone.svg'
import config from '../../assets/icon/config.svg'
import no_couver from '../../assets/image/no_couver.svg'
import view from '../../assets/icon/view.svg'
import like from '../../assets/icon/like.svg'
import { useHistory, useParams } from 'react-router';
import Button from '../../components/Button';
import api from '../../services/api';
import { AxiosError } from 'axios'
import SelectArea, { AreaType } from "../../components/SelectArea";
import SelectTool, { ToolType } from "../../components/SelectTools";
import Modal from '../../components/Modal';
import { Context } from "../../context/AuthContext";
import Login from "../../components/Login";
import NavBar from '../../components/NavBar';
import Vacancy from '../../components/Vacancy';
import Textarea from '../../components/Textarea';
import Input from '../../components/Input';
import Dropzone from '../../components/Dropzone';
import { textareaChange } from '../../utils/textareaChange';
interface routeParms {
  id: string;
}
interface ProjectType {
  nome: string;
  descricao: string;
  visibilidade: true;
  objetivo: string;
  foto_capa: string;
  areas: AreaType[];
  habilidades: ToolType[];
  id: number;
}
/**
 * @constructor
 * @content is the iten of the modal
 */

function Projects() {
  const { loading, isAuthenticated } = useContext(Context);
  //const [modalContent, setModalContent] = useState<ReactNode>(null);
  const initialModalContent = {
    nome: false,
    descricao: false,
    objetivo: false,
    foto: false,
    vaga: false,
    areas: false,
    habilidades: false
  };
  const [modalContent, setModalContent] = useState(initialModalContent);
  const history = useHistory();
  const [openModal, setOpenModal] = useState<boolean>(isAuthenticated);
  const projeto_id = useParams<routeParms>().id;
  const [project, setProject] = useState({} as ProjectType)
  const [formData, setFormData] = useState({} as ProjectType)
  const [recordedAreas, setRecordedAreas] = useState<Array<AreaType>>([]);
  const [recordedTools, setRecordedTools] = useState<Array<ToolType>>([]);
  const [selectedImage, setSelectedImage] = useState<File>();

  useEffect(() => {
    const res = api
      .get(`/api/v1/projeto/${projeto_id}`)
      .then((response) => {
        setProject(response.data);
        setRecordedTools(response.data.habilidades);
        setRecordedAreas(response.data.areas);
        setFormData(response.data);
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail;
      });
    console.log(res);

  }, [projeto_id]);
  useEffect(() => {
    modalContent != initialModalContent && setOpenModal(true);
  }, [modalContent])


  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    console.log(event.target);
    setFormData({ ...formData, [name]: value });
  }

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setProject({ ...formData });
    setOpenModal(false);
    console.log(formData)
  }
  return (
    <BodyProjects>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        onAfterClose={() => {
          setOpenModal(!isAuthenticated);
        }}
      >
        {!loading && !isAuthenticated ?
          <BodyModalDefault>
            <h1>Para prosseguir, você precisa estar logado</h1>
            <Login onSuccessLogin={() => setOpenModal(isAuthenticated)} />
          </BodyModalDefault> :
          <>
            {!modalContent.vaga && <form className="modal" onSubmit={handleSubmit}>
              {modalContent.foto && <Dropzone onFileUploaded={setSelectedImage} />}
              {modalContent.nome && <Input
                name="nome"
                label="Nome do projeto"
                mask=""
                defaultValue={project.nome}
                onChange={handleInputChange}
              />}
              {modalContent.objetivo && <Textarea
                name="objetivo"
                label="Objetivo breve do projeto"
                defaultValue={project.objetivo}
                onChange={handleTextAreaChange}
              />}
              {modalContent.descricao && <Textarea
                name="descricao"
                label="Descrição sobre o projeto"
                defaultValue={project.descricao}
                onChange={handleTextAreaChange}
              />}
              {modalContent.areas && <SelectArea
                label="Selecione as àreas de atuação"
                callbackSelectedAreas={recordedAreas}
                setCallbackSelectedAreas={setRecordedAreas}
              />}
              {modalContent.habilidades && <SelectTool
                label="Selecione as ferramentas ou habilidades"
                callbackSelectedTools={recordedTools}
                setCallbackSelectedTools={setRecordedTools}
              />}
              <Button theme="primary-green" type="submit">Salvar</Button>
            </form>}
            {modalContent.vaga && <Vacancy project={project} />}
          </>
        }
      </Modal>


      <header>
        <div className="area-img">

          <img src={no_couver} alt="imagem de capa do projeto" />
          <section>
            <Link to="" >+</Link>
            <img
              src={edit}
              alt="editar a imagem de capa"
              onClick={() => setModalContent({ ...initialModalContent, "foto": true })}
            />
          </section>
        </div>
        <aside>
          <h1>
            {project.nome}
            <img
              src={edit}
              alt="editar o nome"
              onClick={() => setModalContent({ ...initialModalContent, "nome": true })}
            />
          </h1>
          <div className="icons">
            <img src={like} alt="curtidas" />
              194
              <img src={view} alt="vizualizações" />
              2945
          </div>
          <p>
            Publicado em:
            </p>
          <section>
            <Button theme="primary-green">Curtir</Button>
            <Button type="submit">Salvar</Button>
          </section>
        </aside>
      </header>
      <main className="container">
        <div className="objdes">

          <aside>
            <section>
              <legend>Objetivo</legend>
              <img
                src={edit}
                alt="editar"
                onClick={() => setModalContent({ ...initialModalContent, "objetivo": true })}
              />
            </section>
            <p>{project.objetivo}</p>
          </aside>
          <aside>
            <section>
              <legend>Descrição</legend>
              <img
                src={edit}
                alt="editar"
                onClick={() => setModalContent({ ...initialModalContent, "descricao": true })}
              />
            </section>
            <p>{project.descricao}</p>
          </aside>
        </div>
        <div className="caracteristicas">
          <legend>
            Áreas de desenvolvimento
            <img
              src={edit}
              alt="editar"
              onClick={() => setModalContent({ ...initialModalContent, "areas": true })}
            />
          </legend>
          <aside>
            {project.areas?.map(area => (
              <span key={area.id}>{area.descricao}</span>
            ))}

          </aside>
          <legend>
            Habilidades e ferramentas
            <img
              src={edit}
              alt="editar"
              onClick={() => setModalContent({ ...initialModalContent, "habilidades": true })}
            />
          </legend>
          <aside>
            {project.habilidades?.map(habilidade => (
              <span key={habilidade.id}>{habilidade.nome}</span>
            ))}
          </aside>
        </div>

        <aside>

          <div className="vagas">
            <legend>
              Vagas
                <img
                src={edit}
                alt="editar"
                onClick={() => setModalContent({ ...initialModalContent, "vaga": true })}
              />
            </legend>

            <section>
              <aside>
                <legend>Ux Designer</legend>
                <p>
                  Trainee | Não remunerado <br />
                  2 Vagas
                </p>
              </aside>


              <img src={config} alt="duplicar as vagas" />

            </section>
          </div>
          <div className="descricao">
            <legend>Descrição da vaga</legend>
            <section>
              <p>Sobre a Empresa:<br /><br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porttitor lacus. Praesent ac nisl ut magna dapibus semper auctor sed justo. Nulla mattis massa eu ligula consectetur consequat. Donec a ante nisl. Donec quam erat, feugiat eleifend quam vel, tincidunt lacinia nisl. Aliquam tempus elementum mauris
              </p>
            </section>
          </div>
        </aside>
      </main>

    </BodyProjects>
  )
}
export default Projects;